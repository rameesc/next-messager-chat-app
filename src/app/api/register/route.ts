

import bcrypt from "bcrypt"


import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"



export const POST =async(req:Request):Promise<Response>=>{
   

    try{

        const body = await req.json();

     const { email,password,name} = body

     if(!email || !password || !name){

        return  NextResponse.json({message:'missing info'}, {status:400})
     }


     const isUser = await prisma.user.findUnique({
         where:{
            email:email
        }
     })

     if(isUser){
        return  NextResponse.json({message:'user already exist'}, {status:400})
     }


     const hashPassword = await bcrypt.hash(password,12)


     //created user

    await prisma.user.create({
        data:{
            name,
            hashPassword:hashPassword,
            email
        }
     })


     
        return NextResponse.json({
            message:'successfully registerd',
            status:true
        })
     


    }catch(error){

        if(error instanceof Error){
            return NextResponse.json({message: error.message},{status:500})
        }
        return NextResponse.json({error:'message_error'},{status:500})
    }
    
    


}