'use client'

import { useConversation } from '@/hooks/useConversation'
import { FullMessageType } from '@/types'
import React, { useEffect, useRef, useState } from 'react'
import { MessageBox } from './MessageBox'
import axios from 'axios'
import { pusherClient } from '@/libs/pusher'
import { find } from 'lodash'


type BodyProps={
  initialMessages:FullMessageType[]
}

export const Body:React.FC<BodyProps> = ({
  initialMessages
}) => {

  const [messages ,setMessages] = useState(initialMessages)

  

  const bottomRef =useRef<HTMLDivElement>(null)

  

  const {conversationId} =useConversation()

 

  useEffect(()=>{

    axios.post(`/api/conversation/${conversationId}/seen`)

  },[conversationId])

  
  useEffect(()=>{
    
    bottomRef.current?.scrollIntoView()
   

    const messageHandler=(message:FullMessageType)=>{

      axios.post(`/api/conversation/${conversationId}/seen`)

      setMessages((current)=>{
        
        if(find(current, {id:message.id})){

           return current
        }
        return [...current,message]

      });
    

      bottomRef.current?.scrollIntoView()

    }

    const updateHandler=(newMessage:FullMessageType)=>{
          
      setMessages((current)=>current.map((currentMessage)=>{

        if(currentMessage.id==newMessage.id){

          return newMessage
        }

        return currentMessage
      }))

    }

   
    
     pusherClient.subscribe(conversationId)

    

     pusherClient.bind("messages:new",messageHandler)
     pusherClient.bind('message:update',updateHandler)
    
    
    return ()=>{
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('messages:new',messageHandler)
      pusherClient.unbind('message:update',updateHandler)
    }
   

  },[conversationId])

  return (
    <div className='w-full h-[600px]  overflow-y-scroll flex bg-red-50   flex-col flex-1  '>
     
      {messages.map((message ,i)=>(
        <MessageBox
          key={message.id}
          isLast={i==messages?.length-1 } 
          data={message}
        />
      ))}
      <div>
        
   
       
      </div>
      <div ref={bottomRef} className='pt-24' />
    </div>
  )
}
