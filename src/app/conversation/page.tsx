'use client'



import { EmtyState } from '@/components/EmtyState'
import { useConversation } from '@/hooks/useConversation'
import clsx from 'clsx'
import React from 'react'

const ConversationPage = () => {

    const {isOpen} =useConversation()
  return (
    <div className={clsx('lg:pl-80 h-full lg:block',
        isOpen ? 'block' : 'hidden'
    )}>
        <EmtyState/>
    </div>
  )
}

export default ConversationPage