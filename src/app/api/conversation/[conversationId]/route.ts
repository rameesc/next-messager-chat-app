import { getCurrentUser } from "@/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from '@/libs/prismadb'
import { pusherServer } from "@/libs/pusher"
import { User } from "@prisma/client"


type Iparams={
    params:{
        conversationId:string
    }
}


export  async function  DELETE(
    req:Request,
   {params}:Iparams
):Promise<Response>{


    try{

        const {conversationId }=params

        const currentUser=await getCurrentUser()

        if(!currentUser?.id){

            return  NextResponse.json({error:'Unauthorized'},{status:401})


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

         await prisma.conversation.deleteMany({
            where:{
                id:conversationId,
                userIds:{
                    hasSome: [currentUser?.id]
                }

            }
        });

        await Promise.all(
            existingConversation.users.forEach((user:User)=>{
                if(user.email){
                   return pusherServer.trigger(user.email,'conversation:remove',existingConversation)
                }

                return Promise.resolve()
            })
    

        )

        
      

        
        
            
        

        
       

        return NextResponse.json({ message: "Conversation deleted successfully"},{status:200})

    


    }catch(error:unknown){
        if(error instanceof Error){
            return error.message

        }
        return NextResponse.json({ error: "An error occurred while deleting the conversation" }, { status: 500 });
       
    }

}