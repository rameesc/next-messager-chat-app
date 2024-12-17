'use client'

import {SessionProvider} from "next-auth/react"


type AuthContextProps ={
    children:React.ReactNode
}

export const AuthContext=async({children}:AuthContextProps)=>{

    return <SessionProvider>{children}</SessionProvider>

}