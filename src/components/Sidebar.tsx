

import React from 'react'
import { DesktopSidebar } from './DesktopSidebar'
import { MobileFooter } from './MobileFooter'
import { getCurrentUser } from '@/actions/getCurrentUser'

type SlidebarProps={
    children:React.ReactNode
}

export const Sidebar =async ({children}:SlidebarProps) => {

    const currentUser =await getCurrentUser()

  return (
    <div className='h-full'>
        <DesktopSidebar currentUser={currentUser!}/>
        <MobileFooter/>
        <main className='lg:pl-20 h-full'>
          {children}
        </main>
       
    </div>
  )
}
