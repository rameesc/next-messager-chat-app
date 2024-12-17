'use client'





import { useOtherUser } from '@/hooks/useOtherUser'
import { Conversation, User } from '@prisma/client'
import { format } from 'date-fns'
import React, { Fragment, useMemo, useState } from 'react'
import {Dialog, Transition} from '@headlessui/react'
import { Avatar } from '@/components/Avatar'
import { IoTrash } from 'react-icons/io5'

import { ConfirmModal } from './ConfirmModal'
import { GroupAvatar } from '@/components/GroupAvatar'
import { userActiveList } from '@/hooks/useActiveList'

type ProfileDrawerProps={
    data:Conversation &{
        users:User[]
    }
    isOpen:boolean
    onClose:()=>void
}

export const ProfileDrawer:React.FC<ProfileDrawerProps> = (
    {
        data,
        isOpen,
        onClose
    }
) => {

    const otherUser = useOtherUser(data)

    const [confirmOpen,setConfirmOpen]=useState(false)

    const joinedDate =useMemo(()=>{

        return format(new Date(otherUser.createdAt),'PP')

    },[otherUser.createdAt])

    const CretaeGropDate =useMemo(()=>{

        return format(new Date(data.createdAt),'PP')

    },[data.createdAt])

    const title =useMemo(()=>{

        return data.name || otherUser.name

    },[data.name, otherUser.name])

    const {members}= userActiveList()

    const isActive=members.indexOf(otherUser.email!)!==-1

    const statusText = useMemo(()=>{

        if(data.isGroup){
            return `${data.users.length} members`
        }

        return isActive ?"Online":`Offline`

    },[data,isActive])

  return (
    <>
       <ConfirmModal
        isOpen={confirmOpen}
        onClose={()=>setConfirmOpen(false)}
       />
       
      <Transition.Root 
      show={isOpen}  
      as={Fragment} 

      >
         <Dialog 
        as='div' 

          className={'relative  z-50'}          
          onClose={()=>onClose()}
      >
          <Transition.Child
           as={Fragment}
           enter='ease-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          >

         <div 
          className='fixed inset-0 bg-black bg-opacity-40'
         >
           
           <div className=' absolute inset-0 overflow-hidden'>
             
             <div className=' pointer-events-none fixed inset-y-0  right-0 flex max-w-full pl-10'>
                 <Transition.Child
                  as={Fragment}
                  enter='transform transition ease-in-out duration-500'
                  enterFrom='translate-x-full'
                  enterTo='translate-x-0'
                  leave='transform transition ease-in-out duration-500'
                  leaveTo='translate-x-full'
                 >

                    <Dialog.Panel
                     className='pointer-events-auto  w-screen max-w-md'

                    >
                        <div className='flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl'>
                            
                            <div className='px-4 sm:px-6 '>

                                <div className='flex items-start justify-end'>

                                    <div className='ml-3 flex h-7 items-center'>
                                        <button 
                                         type='button'
                                         className=' rounded-md bg-white text-gray-400 hover:text-red-500 focus:ring-2 focus:ring-sky-400 focus:outline-none'

                                         onClick={onClose}
                                         >
                                            X
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className=' relative mt-6 flex-1 px-4 sm:px-6'>

                                <div className='flex flex-col items-center'>

                                    <div className='mb-2'>
                                         {data.isGroup?(
                                             <GroupAvatar users={data.users}/>
                                               ):(
                                              <Avatar user={otherUser}/>
                                         )}
                                    </div>
                                    <div>
                                       {title}
                                     
                                    </div>
                                    <div className='text-sm text-gray-500'>
                                        {statusText}
                                    </div>

                                    <div className='flex gap-10 my-8'>

                                        <div 
                                          onClick={()=>setConfirmOpen(true)}
                                          className='flex cursor-pointer hover:opacity-75 flex-col gap-3 items-center'
                                        >
                                           
                                           <div className='w-10  h-10 bg-neutral-300 rounded-full flex items-center justify-center'>
                                            <IoTrash size={20}/>
                                           </div>
                                           <div className='text-sm font-light text-neutral-600'>
                                             Delete
                                            </div>
                                        </div>
                                    </div>

                                    <div className='w-full pb-5 pt-5 sm:px-0 sm:pt-0'>
                                        <dl
                                         className='space-y-8 px-4 sm:space-y-6 sm:px-6'
                                        >
                                            {data.isGroup && (
                                                <div>
                                                     <dt
                                                     className='text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0'
                                                     >
                                                        Emails

                                                    </dt>
                                                    <dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>
                                                        {data.users.map((user)=><p key={user.id}>{user.email}</p>)}
                                                    </dd>

                                                    <dt
                                                     className='text-sm mt-5 font-medium text-gray-500 sm:w-40 sm:flex-shrink-0'
                                                    >
                                                        Created by
                                                    </dt>
                                                    <dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>

                                                        <time dateTime={CretaeGropDate}>
                                                            {CretaeGropDate}
                                                        </time>
                                                       
                                                    </dd>
                                                </div>
                                            )}
                                            {!data.isGroup && (

                                                <div>
                                                    <dl className='text-sm font-medium text-gray-500'>
                                                        Email
                                                    </dl>
                                                    <dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>
                                                        {otherUser.email}
                                                    </dd>
                                                </div>

                                            )}

                                            {!data.isGroup &&(
                                                <>
                                                <hr />
                                                <div>
                                                    <dt
                                                     className='text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0'
                                                    >
                                                        Joined
                                                    </dt>
                                                    <dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>

                                                        <time dateTime={joinedDate}>
                                                            {joinedDate}
                                                        </time>
                                                       
                                                    </dd>

                                                </div>
                                                </>
                                            )}
                                        </dl>
                                    </div>
                                    
                                </div>
                            </div>

                        </div>

                    </Dialog.Panel>

                 </Transition.Child>
             </div>

           </div>
         </div>

          </Transition.Child>

       </Dialog>


      </Transition.Root>
    </>
    

  )
}
