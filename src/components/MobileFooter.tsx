'use client'

import { useConversation } from '@/hooks/useConversation'
import { useRoutes } from '@/hooks/useRoutes'
import React from 'react'
import { MobileItem } from './MobileItem'

export const MobileFooter = () => {

    const routes = useRoutes()
    const {isOpen} = useConversation()

    if(isOpen){
        return null;
    }

  return (
    <div
     className='fixed justify-between w-full bottom-0 lg:hidden bg-white border-t-[1px] z-40 flex items-center' 
    >
        {routes.map((item)=>(
                   <MobileItem
                     key={item.label}
                     href={item.href}
                     label={item.label}
                     icon={item.icon}
                     active={item.active}
                     onClick={item.onClick}
                    />
                ))}
    </div>
  )
}
