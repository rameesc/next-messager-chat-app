

import { authOptions} from '@/libs/auth'

import {getServerSession} from 'next-auth'


export const getSession = async()=>{

    return await getServerSession(authOptions)
}