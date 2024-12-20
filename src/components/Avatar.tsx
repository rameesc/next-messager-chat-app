'use client'

import { userActiveList } from '@/hooks/useActiveList'
import { User } from '@prisma/client'
import Image from 'next/image'
import React, { useMemo } from 'react'

type AvatarProps={
    user:User
    
}

export const Avatar:React.FC<AvatarProps> = ({
    user
}) => {

  const {members} = userActiveList()

  const isActive=useMemo(()=>{
    return members.indexOf(user?.email?? "Default Email")!==-1
  },[members,user.email])

 
  return (

    <div className='relative'>
        <div 
         className=' relative inline-block rounded-full overflow-hidden h-9  w-9 md:h-11 md:w-11'
        >
            <Image 
             alt='image' 
             fill
             src={user?.iamge || '/assets/images/user.jpg'}
            />

        </div>
        {isActive&&(
           <span 
           className='absolute block rounded-full bg-green-500  ring-white top-0  right-0 h-2 w-2 md:h-3 md:w-3'
          />

        )}
       
    </div>
  )
}
