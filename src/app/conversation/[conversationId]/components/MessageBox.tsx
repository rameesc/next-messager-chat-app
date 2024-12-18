




import { Avatar } from '@/components/Avatar'

import { FullMessageType } from '@/types'

import clsx from 'clsx'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

type MessageBoxProps={
    isLast:boolean
    data:FullMessageType
}

export const MessageBox:React.FC<MessageBoxProps> =({
    isLast,
    data
}) => {

    const session = useSession()
    if(session.status=='loading'){
    return <div className='flex flex-col p-5 w-[100%]'>
         <div className='flex flex-col gap-1 self-end'>
            <div className='w-[100%] h-[50px] bg-gray-500 rounded-md  animate-pulse'></div>
            <div className='w-[200px] h-[50px] rounded-md  bg-gray-500 animate-pulse'></div>
            <div className='w-[200px] h-[50px] rounded-md  bg-gray-500 animate-pulse'></div>
            <div className='w-[200px] h-[50px] rounded-md  bg-gray-500 animate-pulse'></div>
         </div>
         <div className='flex flex-col gap-1 self-start'>
            <div className='w-[200px] h-[50px] rounded-md  bg-gray-500 animate-pulse'></div>
            <div className='w-[200px] h-[50px] rounded-md  bg-gray-500 animate-pulse'></div>
            <div className='w-[200px] h-[50px] rounded-md  bg-gray-500 animate-pulse'></div>
            <div className='w-[200px] h-[50px] rounded-md  bg-gray-500 animate-pulse'></div>
         </div>
    </div>
    }

    
  
    const isOwn= session?.data?.user?.email == data.sender.email

    const seenList= (data.seen || [])
    .filter((user)=>user.email !==data.sender.email)
    .map((user)=>user.name)
    .join(', ')

    const container = clsx(
        "flex gap-3 p-4",
     isOwn && ' justify-end'
    )

    const avatar =clsx(isOwn && 'order-2')

    const body =clsx(
        "flex flex-col gap-2",
        isOwn && 'items-end'
    )

    const message = clsx(
        "text-sm w-fit overflow-hidden",
        isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100',
        data?.image ? 'rounded-sm p-0' : 'rounded-full py-2 px-3'
    );
   


  return (
    <div className={container}>

        <div className={avatar}>
            <Avatar user={data.sender}/>

        </div>
        <div className={body}>
            <div className='flex items-center gap-1'>
                <div className='text-sm text-gray-500'>
                    {data.sender.name}
                </div>
                <div className='text-xs text-gray-400'>
                  {format(new Date(data.createdAt),'p')}
                </div>

            </div>
            <div className={message}>
              {data.image ?(
                <Image 
                 className=' object-cover translate transition cursor-pointer hover:scale-110'
                 height={280}
                 width={280}
                 alt='img' 
                 src={data.image}/>
              ):(
               <div>{data.body}</div>
              )}
            </div>
            {isLast && isOwn && seenList.length > 0 &&(
                <div
                 className='text-xs font-light text-gray-500'
                >
                    {`Seen By ${seenList}`}
                </div>
            )}
           

        </div>

    </div>

    //   <div className={clsx('',
    //    isOwn?' self-end':'self-start'

    //   )}>
    //     {data.image&&
    //     <div className='bg-gray-300 rounded-md p-1 m-1'>
    //         <img style={{width:'200px', height:'200px',padding:'5px'}} src={data.image} alt="img" />
    //         <p className='text-sm text-gray-400'>{format(data.createdAt,'p')}</p> 
            
    //     </div>}
        

    //     {data.body&& 
    //     <div className='bg-green-200 p-1 m-1 max-w-[200px] block rounded-md'>
    //        <p>{data.body}</p> 
    //       <p className='text-sm text-gray-400'>{format(data.createdAt,'p')}</p> 
    //     </div>}
      
        
    //  </div>
   
    
  )
}
