

import bcrypt from "bcrypt"
import NextAuth ,{AuthOptions} from "next-auth"
import  CredentialsProvider  from "next-auth/providers/credentials"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import {PrismaAdapter} from '@next-auth/prisma-adapter'

import prisma from '@/libs/prismadb'

export const authOptions: AuthOptions = {

    adapter : PrismaAdapter(prisma),

    providers:[
        Github({
            clientId:process.env.GITHUB_ID as string ,
            clientSecret:process.env.GITHUB_SECRET as string
        }),
        Google({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
        CredentialsProvider({

            name:"credentials",
            credentials: {
                email :{
                    label:"email",
                    type : "text"
                },
                password:{
                    label:'password',
                    type:'password'
                }

            },

           async authorize(credentials) {

              if(!credentials?.email || !credentials?.password){

                throw new Error('Invalid Credentials')

              }

              const user = await prisma.user.findUnique({
                where:{
                    email:credentials.email
                }
              });

              if(!user || !user?.hashPassword){

                throw new Error('Invalid Credentials')
              }

              const isCorrectPassword = await bcrypt.compare(
                credentials.password,
                user.hashPassword

              )

              if(!isCorrectPassword){
                throw new Error('Invalid Credentials password not match')

              }


              return user
                
            },

            
        })

    ],
    debug :process.env.NODE_ENV  ==='development',
    session:{
        strategy:"jwt",
    },
    secret:process.env.NEXTAUTH_SECRET


}

 const handler= NextAuth(authOptions)

export {handler as GET, handler as POST , }