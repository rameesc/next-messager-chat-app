

import prisma from "@/libs/prismadb"
import { getCurrentUser } from "./getCurrentUser"


export const getConversation=async()=>{

    const currentUser=await getCurrentUser()

    if(!currentUser?.id){

        return []
    }


    try{

        const conversation = await prisma.conversation.findMany({

            orderBy:{
                lastMessage:"desc"
            },
            where:{
                userIds:{
                    has:currentUser.id
                }
            },
            include:{
                users:true,
                message:{
                    include:{
                        sender:true,
                        seen:true
                    }
                }
            }
        })


        return conversation


    }catch(error:unknown){
        if(error instanceof Error)
        return error.message
    }
}