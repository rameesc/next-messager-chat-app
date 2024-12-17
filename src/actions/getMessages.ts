
import prisma from '@/libs/prismadb'



export const getMessages = async(
    conversationId:string
)=>{

    try{

        const message =await prisma.message.findMany({
            where:{
                conversationId:conversationId
            },
            include:{
                seen:true,
               sender:true
            },
            orderBy:{
                createdAt:"asc"
            }
        })



      return message

    }catch(error:any){

        return []

    }

}