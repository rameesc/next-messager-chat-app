
'use client'


import { useConversation } from '@/hooks/useConversation'
import { FullConversationType } from '@/types'
import {  User } from '@prisma/client'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { MdGroupAdd } from "react-icons/md";
import { ConversationBox } from './ConversationBox'
import { GroupChatModal } from './GroupChatModal'
import { useSession } from 'next-auth/react'
import { pusherClient } from '@/libs/pusher'
import { find } from 'lodash'

type ConversationListProps={

    initialItem:FullConversationType[]
    users:User[]
}

export const ConversationList:React.FC<ConversationListProps> = (
    {
        initialItem,
        users
    }
) => {


    const [items,setItems] = useState(initialItem)

    const [isModalOpen,setIsModalOpen]=useState(false);

    const session =useSession()


    const router=useRouter()

    const {conversationId,isOpen} =useConversation()

    const pusherKey =useMemo(()=>{

        return session.data?.user?.email

    },[session.data?.user?.email])

    useEffect(()=>{

      if(!pusherKey){

        return;
      }
     const chats= pusherClient.subscribe(pusherKey)
     

      const newHandler=(conversation:FullConversationType)=>{
    
        setItems((current)=>{

          if(find(current,{id:conversation.id})){
             
            return current;
          }

          return [conversation,...current]

        })
       




      }

      const updateHandler=(con:FullConversationType)=>{
       
        setItems((current)=>current.map((currentConver)=>{
         

             
          if(currentConver.id==con.id){
            return{
              ...currentConver,
              message:con.message 
            }
          }

          return currentConver;
        }))
        
      }


      const removeHandler=(conversation:FullConversationType)=>{

        setItems((current)=>{
          return [...current.filter((conver)=>conver.id!==conversation.id)]
        })

        if(conversationId==conversation.id){

          router.push('/conversation')
        }

      }

     

      
      
      
      chats.bind('conversation:new',newHandler)
      chats.bind('conversation:update',updateHandler)
      chats.bind('conversation:remove',removeHandler)
      


      return ()=>{

        chats.unbind('conversation:new',newHandler)
        chats.unbind('conversation:update',updateHandler)
        chats.unbind('conversation:remove',removeHandler)
      

      }

    },[pusherKey,conversationId,router])


  return (

    <>
      
      <GroupChatModal
       users={users}
       isOpen={isModalOpen}
       onClose={()=>setIsModalOpen(false)}
      
      />
    
      <aside
       className={clsx(` fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200`,
        isOpen ? " hidden" :"block w-full left-0"
      )}
     >
        <div className='px-5'>
            <div className='flex  justify-between items-center'>
                <div className='text-2xl font-bold text-neutral-800 py-4'>
                   Messages
                </div>

                <div
                onClick={()=>setIsModalOpen(true)}
                 className=' rounded-full p-2 bg-gray-500 cursor-pointer hover:opacity-75 transition' 
                 >
                 <MdGroupAdd size={20}/>

                </div>

            </div>

            {items.map((item)=>(
                <ConversationBox
                  key={item.id}
                  data={item}
                  selected={conversationId== item.id}

                />
            ))}
            
            

          
        </div>


      </aside>
    </>
    
  )
}
