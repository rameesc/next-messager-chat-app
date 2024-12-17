
import { getConversationById } from '@/actions/getConversationById'
import { getMessages } from '@/actions/getMessages'
import { EmtyState } from '@/components/EmtyState'
import React from 'react'
import { Header } from './components/Header'
import { Body } from './components/Body'
import { Form } from './components/Form'


type Iparams={
    params:{
        conversationId:string
    }
  
}





const conversationId = async({params}:Iparams) => {

  const conversation = await getConversationById(params?.conversationId)

  const messages =await getMessages(params?.conversationId)

  if(!conversation){

    return(
      <div className='lg:pl-80 h-full'>
        {JSON.stringify(conversation)}
        <div className='h-full flex flex-col'>
          <EmtyState/>
        </div>
      </div>
    )
  }

  return (
    <div className='lg:pl-80 h-[100%]'>

      <div className='h-[600px] flex flex-col '>
       <Header conversation={conversation}/>
       <Body initialMessages={messages} />
       <Form/>
      </div>
    </div>
  )
}

export default conversationId