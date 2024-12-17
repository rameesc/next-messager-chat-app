







import { Sidebar } from '@/components/Sidebar'
import React from 'react'
import { ConversationList } from './components/ConversationList'
import { getConversation } from '@/actions/getConversation'
import { getUsers } from '@/actions/getUser'

type ConversationProps={
    children:React.ReactNode
}

const ConversationLayout:React.FC<ConversationProps> =async ({children}) => {

  const conversation =await getConversation()
  const users= await getUsers()

  return (
    <Sidebar>
      <div className='h-full'>
        <ConversationList 
         initialItem={conversation}
         users={users}
         />

       
       {children}
     </div>
    </Sidebar>
    
  )
}

export default ConversationLayout