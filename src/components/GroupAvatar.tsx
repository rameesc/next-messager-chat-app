'use client'

import { User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

type GroupAvatarProps={
    users?:User[]
}

export const GroupAvatar:React.FC<GroupAvatarProps> = ({
    users
}) => {
    const slicedUsere=users?.slice(0,3)

    const positionMap={
        0:'top-0 left-[12px]',
        1:'bottom-0',
        2:'bottom-0 rigth-0'

    }
  return (
    <div className='relative h-11 w-11'>
        {slicedUsere?.map((user,index)=>(
            <div 
             key={user.id}
             className={`absolute bg-black-300 inline-block rounded-full w-[21px] h-[21px] ${positionMap[index as keyof typeof positionMap]}`} 
            >
                <Image
                  fill
                 alt='img'
                 className=' rounded-full'
                 src={user.iamge ||'/assets/images/user.jpg'}

                />
            </div>

        ))}
    </div>
  )
}
