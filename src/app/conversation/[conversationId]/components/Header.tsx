'use client'



import { useOtherUser } from '@/hooks/useOtherUser'
import { Conversation, User } from '@prisma/client'
import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { FaAngleLeft } from "react-icons/fa6";
import { Avatar } from '@/components/Avatar'
import { IoEllipsisHorizontal } from "react-icons/io5";
import { ProfileDrawer } from './ProfileDrawer'
import { GroupAvatar } from '@/components/GroupAvatar'
import { userActiveList } from '@/hooks/useActiveList'

type HeaderProps={
    conversation:Conversation &{
        users:User[]
    }
}

export const Header:React.FC<HeaderProps> = ({
    conversation
}) => {

    const otherUser = useOtherUser(conversation)

    const [drawerOpen ,setDrawerOpen] =useState(false)

    const {members}=userActiveList()

    const isActive=members.indexOf(otherUser.email!)!==-1

    const statusText =useMemo(()=>{

        if(conversation.isGroup){

            return `${conversation.users.length} members`;
        }

        return isActive? 'online':'offline'

    },[conversation,isActive])

  return (
    <>

       <ProfileDrawer 
         data={conversation}
         isOpen={drawerOpen}
         onClose={()=>setDrawerOpen(false)}
       
        />
      <div className='bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm'>
       
        <div className='flex gap-3 items-center'>
         <Link 
          className='lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer'
          href={'/conversation'}>
            <FaAngleLeft size={32}/>
          </Link>
          {conversation.isGroup?(
            <GroupAvatar users={conversation.users}/>
          ):(
           <Avatar user={otherUser}/>
          )}
         
          <div className='flex flex-col'>
            <div>
                {conversation.name || otherUser.name}
            </div>
            <div className='text-sm font-light text-neutral-500'>
                {statusText}
            </div>
          </div>
        </div>
         <IoEllipsisHorizontal
           size={35}
            className='text-sky-300 cursor-pointer hover:text-sky-400 transition'
           onClick={()=>setDrawerOpen(true)}
         />

       
      </div>
    
    </>
    
  )
}
