import { getCurrentUser } from "@/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from '@/libs/prismadb'
import { pusherServer } from "@/libs/pusher"


type Iparams={
    params:{
        conversationId:string
    }
}


export const DELETE=async(
    req:Request,
   {params}:Iparams
)=>{


    try{

        const {conversationId }=params

        const currentUser=await getCurrentUser()

        if(!currentUser?.id){

            return  NextResponse.json({error:'Unauthorized'},{status:400})

        }

        const existingConversation = await prisma.conversation.findUnique({
            where:{
                id:conversationId
            },
            include:{
                users:true
            }
        })


        if(!existingConversation){

            return  NextResponse.json({error:'Invalid id'},{status:400})

        }

        const deletedConversation  = await prisma.conversation.deleteMany({
            where:{
                id:conversationId,
                userIds:{
                    hasSome: [currentUser?.id]
                }

            }
        });

        existingConversation.users.forEach((user)=>{
            if(user.email){
                pusherServer.trigger(user.email,'conversation:remove',existingConversation)
            }
        })

      

        
        
            
        

        
       

        return NextResponse.json(deletedConversation)

    


    }catch(error:unknown){
        if(error instanceof Error){
            return error.message

        }
        return NextResponse.json({ error: "An error occurred while deleting the conversation" }, { status: 500 });
       
    }

}