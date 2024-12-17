

import bcrypt from "bcrypt"


import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"



export const POST =async(req:Request)=>{

    const body = await req.json();

    const { email,password,name} = body

    if(!email || !password || !name){

        return new NextResponse('missing info', {status:400})
    }


    const isUser = await prisma.user.findUnique({
        where:{
            email:email
        }
    })

    if(isUser){
        return new NextResponse('user already exist', {status:400})
    }


    const hashPassword = await bcrypt.hash(password,12)


    //created user

    const newUser = await prisma.user.create({
        data:{
            name,
            hashPassword:hashPassword,
            email
        }
    })


    if(newUser){
        return NextResponse.json({
            message:'successfully registerd',
            status:true
        })
    }

    


}