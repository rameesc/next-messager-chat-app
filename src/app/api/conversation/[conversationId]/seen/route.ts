import { getCurrentUser } from "@/actions/getCurrentUser";
import { error } from "console";
import { NextResponse } from "next/server";

import prisma from '@/libs/prismadb'
import { pusherServer } from "@/libs/pusher";


type Params={
    params:{
        conversationId?:string;
    }
  
}

export const POST=async(
    req:Request,
    {params}:Params
   
)=>{

    try{

        const currentUser = await getCurrentUser()

        const {conversationId} = params

        if(!currentUser?.id || !currentUser.email){
            return new NextResponse('unAuthorized')
        }

        //find the existing coversated

        const conversation = await prisma.conversation.findUnique({
            where:{
                id:conversationId
            },
            include:{
                message:{
                    include:{
                        seen:true

                    }
                },
                users:true
            }  
        });

        if(!conversation){

            return new NextResponse('Invalid ID')
        }

        //find the last message
        

        const lastMessage = conversation.message[conversation.message.length-1];
          

        if(!lastMessage){
            return NextResponse.json(conversation)
        }

        //update seen of last message

        const updatedMessage = await prisma.message.update({
            where:{
                id:lastMessage.id
            }
            ,
            include:{
                seen:true,
                sender:true
            },
            data:{
                seen:{
                    connect:{
                        id:currentUser.id
                    }
                }

            }
        })

        await pusherServer.trigger(currentUser.email,'coversation:update',{
            id:conversationId,
            message:[updatedMessage]
        })

        if(lastMessage.seenIds.indexOf(currentUser.id)!== -1){

            return NextResponse.json(conversation)
        }

        await pusherServer.trigger(conversationId!,'message:update',updatedMessage)


        return NextResponse.json(updatedMessage)






    }catch(error:any){

        console.log(error,'ERROR_MESSAGE_SEEN')

        return new NextResponse('internal error')
    }


}