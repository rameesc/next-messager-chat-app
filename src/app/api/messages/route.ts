import { getCurrentUser } from "@/actions/getCurrentUser"
import { NextResponse } from "next/server"

import prisma from "@/libs/prismadb"
import { pusherServer } from "@/libs/pusher"


export const POST=async(
    req:Request
):Promise<Response>=>{


    try{

        const currentUser =await getCurrentUser();

        const body = await req.json();

        const {message, image, conversationId} = body;


        if(!currentUser?.id || !currentUser?.email){

            return NextResponse.json({message:'Unauthorized'},{status:401})

        }


        const newMessage = await prisma.message.create({

            data:{
                body:message,
                image:image,
                conversation:{
                connect:{
                    id:conversationId
                }
               },
               sender:{
                connect:{
                    id:currentUser.id
                },
                
               },
               seen:{
                connect:{
                    id:currentUser.id
                }
               },
               

            },
            include:{
                seen:true,
                sender:true
            }
        })

        const updatedConversation = await prisma.conversation.update({
            where:{
                id:conversationId
            },
            data:{
                lastMessage:new Date(),
                message:{
                    connect:{
                        id:newMessage.id
                    }
                }

               
            },
            include:{
                users:true,
                message:{
                    include:{
                        seen:true
                    }
                }
            }
            
        })

        await pusherServer.trigger(conversationId,"messages:new",newMessage)

        const lastMessage =updatedConversation.message[updatedConversation.message.length-1]

        updatedConversation.users.map((user)=>{
           pusherServer.trigger(user.email!,'conversation:update',{
                id:conversationId,
                messages :[lastMessage]
            })
        })


        return NextResponse.json(newMessage)



        


    }catch(error:unknown){
        if(error instanceof Error){
            return error.message
        }
        return NextResponse.json({error:'message_error'},{status:500})
        
    }
}


 