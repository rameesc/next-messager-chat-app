import { getCurrentUser } from "@/actions/getCurrentUser"
import { NextResponse } from "next/server"

import prisma from '@/libs/prismadb'
import { pusherServer } from "@/libs/pusher"
import { User } from "@prisma/client"


export const POST=async(
    req:Request
):Promise<Response>=>{

    try{

        const currentUser=await getCurrentUser()

        const body=await req.json();

        const {
            userId,
            isGroup,
            members,
            name
        } = body


        if(!currentUser?.id ||!currentUser.email){
            return  NextResponse.json({message:'Unauthorized'},{status:401})
        }

        if(isGroup && (!members || members.length < 2 || !name)){

            return NextResponse.json({message:'invalid data'})
        }

        if(isGroup){

            const newConversation = await prisma?.conversation.create({
                data:{
                    name,
                    isGroup,
                    users:{
                        connect:[
                            ...members.map((member:{value:string})=>({

                                id:member.value
                            })),{
                                id:currentUser.id
                            }
                        ]
                    }
                },
                include:{
                    users:true
                }
            });

            return NextResponse.json(newConversation);
        }

        const existingConversations = await prisma?.conversation.findMany({

            where:{
                OR:[
                    {
                        userIds:{
                            equals:[currentUser.id,userId]
                        }
                    },
                    {

                        userIds:{
                            equals:[userId,currentUser.id]
                        }
                    }
                ]
            }
        });


        const singleConversation = existingConversations[0] ;

        if(singleConversation){

            return NextResponse.json(singleConversation)
        }


        const newConversation = await prisma?.conversation.create({


            data:{
                users:{
                    connect:[
                        {
                            id:currentUser.id
                        },{
                            id:userId
                        }

                    ]
                }
            },
            include:{
                users:true
            }
        })

        newConversation.users.map((user:User)=>{

            if(user.email){
                

                pusherServer.trigger(user.email,'conversation:new',newConversation)

            }
        })

      
        return NextResponse.json(newConversation)

    } catch(error:unknown){
        if(error instanceof Error){
            return error.message

        }
        return NextResponse.json({ error: "An error occurred while deleting the conversation" }, { status: 500 });
        
    }
}