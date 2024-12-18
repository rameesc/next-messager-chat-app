'use client'

import { FullConversationType } from '@/types'
import React, { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'

import {format} from "date-fns"
import { useSession } from 'next-auth/react'
import clsx from 'clsx'
import { useOtherUser } from '@/hooks/useOtherUser'
import { Avatar } from '@/components/Avatar'
import { GroupAvatar } from '@/components/GroupAvatar'


type ConversationBoxProps={
   
    data:FullConversationType,
    selected:boolean
}

export const ConversationBox:React.FC<ConversationBoxProps> = ({
  
    data,
    selected
}) => {


    const route= useRouter()

    const otherUser = useOtherUser(data)

    const session = useSession()

    const handleClick = useCallback(()=>{

      route.push(`/conversation/${data.id}`)

    },[data.id , route])



    const lastMessages = useMemo(()=>{

      const messages= data.message || []

      return messages[messages.length-1]

 

    },[data.message])

    



    const userEmail=useMemo(()=>{

      return session.data?.user?.email

    },[session.data?.user?.email])


    const hasSeen =useMemo(()=>{

      if(!lastMessages){
        return false
      }

      const seenArray = lastMessages.seen ||  []

      if(!userEmail){
        return false
      }

      return seenArray.filter((user)=>user.email == userEmail).length! == 0

    },[userEmail, lastMessages])

    const lastMessageText=useMemo(()=>{

      if(lastMessages?.image){


        return "Sent an image"
      }

      if(lastMessages?.body){

        return lastMessages.body
      }

      return "started a conversation"

    },[lastMessages])

  return (
    <div
     onClick={handleClick}
     className={clsx(`
      w-full relative flex items-center p-3 space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer
      `,
      selected ? 'bg-neutral-100' :'bg-white'
    )}
    >
      {data.isGroup?(
        <GroupAvatar  users={data.users}/>

      ):(
        <Avatar user={otherUser}/>

      )}
    

      <div className='min-w-0 flex-1'>
         <div className=' focus:outline-none'>
           <div className='flex justify-between items-center md-1'>

            <p
             className='text-md font-medium text-gray-900' 
            >
              {data?.name || otherUser?.name}
            </p>

            {lastMessages?.createdAt&&(
              <p
               className='text-xs text-gray-400 font-light'
              >{format(new Date(lastMessages?.createdAt),'p')}</p>

            )}
            
          
           
            

           </div>
           <p
            className={clsx(` truncate text-sm`,
              hasSeen ? 'text-gray-500' :'text-black font-medium'
            )}
           >
            {lastMessageText} </p>
         </div>
         
      </div>
    </div>
  )
}
