'use client'


import { Inputs } from '@/components/inputs/Input'
import { Modal } from '@/components/Modal'
import { Select } from '@/components/inputs/Select'
import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Button } from '@/components/inputs/Button'


type GroupChatModalProps={
    isOpen:boolean,
    onClose:()=>void,
    users:User[]


}

export const GroupChatModal:React.FC<GroupChatModalProps> = ({
    isOpen,
    onClose,
    users

}) => {

    const route=useRouter()
    const [isLoading,setIsLoading]=useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors,
            
        }

        
    } =useForm<FieldValues>({
        defaultValues:{
            name:'',
            members:[]

        }
    })

    const members=watch("members")

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{

        setIsLoading(true)

        axios.post('/api/conversation',{
            ...data,
            isGroup:true
        })
        .then(()=>{
            route.refresh();
            onClose()
        })
        .catch(()=>toast.error('something went wrong'))
        .finally(()=>setIsLoading(false))

    }
  return (
    <Modal
     isOpen={isOpen}
     onClose={onClose}
    
    >
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-12'>

                <div className='border-b border-gray-900/10 pb-1'>

                 <h2 className='text-base font-semibold leading-7 text-gray-900'>

                    Create a group chat
                 </h2>

                 <p className='text-sm text-gray-500'>Create a chat with more than 2 people</p>

                 <div className='mt-10 flex flex-col gap-y-8'>
                   
                    <Inputs
                     
                     label='Name'
                     id='name'
                     disabled={isLoading}
                     required

                     register={register}

                     errors={errors}
                    
                    />
                    <Select
                     disabled={isLoading}
                     label='Members'
                     options={users.map((user)=>({
                        value:user.id,
                        label:user.name

                     }))}
                     onChange={(value)=>setValue("members",value,{
                        shouldValidate:true
                     })}
                     value={members}
                    />
                 </div>
                
                </div>
                <div className='mt-6 flex items-center justify-end gap-x-6'>
                    <Button
                     type='button'
                     onClick={onClose}
                     disabled={isLoading}
                     secondary
                    >
                        cancel

                    </Button>
                    <Button
                     type='submit'
                   
                     disabled={isLoading}
                    
                    >
                       Create

                    </Button>

                </div>
            </div>


        </form>

    </Modal>
  )
}
