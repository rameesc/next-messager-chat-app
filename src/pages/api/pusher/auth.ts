

import { authOptions } from "@/libs/auth"
import { pusherServer } from "@/libs/pusher"
import {NextApiRequest,NextApiResponse} from "next"
import { getServerSession } from "next-auth"



export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
      ){

        const session =await getServerSession(req,res,authOptions)


        if(!session?.user?.email){

            return res.status(401)
        }

        const {socket_id, channel_name,}= req.body

        const data={
            user_id:session.user.email
        }


        const authRespone = pusherServer.authorizeChannel(socket_id , channel_name , data)


        return res.send(authRespone)



     }

