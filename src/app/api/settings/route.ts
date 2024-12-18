import { getCurrentUser } from "@/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from '@/libs/prismadb'


export const POST=async(req:Request)=>{
    try{
     const currentUser= await getCurrentUser()

     const body =await req.json()

     const {name ,image}= body

     if(!currentUser?.id){
        return new NextResponse('unAuthorized',{status:401})
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
            return error.message

        }
        return 'setting error post'
    }

}