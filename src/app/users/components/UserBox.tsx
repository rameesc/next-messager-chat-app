'use client'

import { Avatar } from '@/components/Avatar'
import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'

type UserBoxProps={
    
    data:User
}

export const UserBox:React.FC<UserBoxProps> = ({
   
    data
}) => {

   const route= useRouter()
  


   const handleClick = useCallback(()=>{

    
        alert(data.id)
     axios.post('/api/conversation',{
        userId:data.id
     })
     .then((data)=>{
        route.push(`/conversation/${data.data.id}`)
     })
    

   },[data,route])

  return (
    <div 
     onClick={handleClick}
     className='w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer'
    >
        <Avatar user={data}/>
        <div className='min-w-0 flex-1'>
            <div className=' focus:outline-none'>

                <div className='flex justify-between items-center mb-1'>

                    <p className='text-sm font-medium text-gray-900'>
                        {data.name}
                    </p>
                    <div>10</div>
                  
                </div>
            </div>
        </div>
    </div>
  )
}
