import { getCurrentUser } from "@/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from '@/libs/prismadb'


export const POST=async(req:Request):Promise<Response>=>{
    try{
     const currentUser= await getCurrentUser()

     const body =await req.json()

     const {name ,image}= body

     if(!currentUser?.id){
        return  NextResponse.json({message:'unAuthorized'},{status:401})
     }

     const updateUser =await prisma.user.update({
        where:{
            id:currentUser.id
        },
        data:{
            name,
            iamge:image
        }
     })


    return NextResponse.json(updateUser)


    


    }catch(error:unknown){
        if(error instanceof Error){
            return NextResponse.json({message: error.message},{status:500})

        }
          return NextResponse.json({ error: "An error occurred while deleting the conversation" }, { status: 500 });
    }

}