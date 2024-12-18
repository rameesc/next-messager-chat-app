'use client'


import { Button } from '@/components/inputs/Button'
import { Modal } from '@/components/Modal'
import { useConversation } from '@/hooks/useConversation'
import { Dialog } from '@headlessui/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { FiAlertTriangle } from 'react-icons/fi'

type ConfirmModalProps={
    isOpen?:boolean
   onClose:()=>void
}

export const ConfirmModal:React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose
}) => {

  const router =useRouter();

  const {conversationId} =useConversation()

  const [isLoading,setIsLoading]=useState(false)


  const onDelete=useCallback(()=>{

    setIsLoading(true)

    axios.delete(`/api/conversation/${conversationId}`)
    .then(()=>{
      onClose()
      router.push('/conversation')
     
      router.refresh()
    })
    .catch(()=>{
      toast.error('something went wrong')
    })
    .finally(()=>setIsLoading(false))

  },[conversationId,router,onClose])

  return (
    <Modal
     isOpen={isOpen}
     onClose={onClose}
    >
     <div className='sm:flex  flex gap-2  mt-1 '>
      <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>

          <FiAlertTriangle
            className='text-red-700 w-6 h-6'
          />

      </div>

      <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>

        <Dialog.Title
         as='h3'
         className='text-base font-semibold leading-6 text-gray-900'
        >
          Delete conversation

        </Dialog.Title>
        <div className='mt-2'>
          <p className='text-sm text-gray-500'>
            Are you sure you want to delete this conversation ?
             this action cannot be undone.
          </p>
        </div>
      </div>
     </div>

     <div className='st-5 sm:nt-4 sm:flex sm:flex-row-reverse'>
      <Button
        onClick={onDelete}
        disabled={isLoading}
        danger
        type='submit'
      >
        Delete
      </Button>
      <Button
        onClick={onClose}
        disabled={isLoading}
        secondary
        type='submit'
      >
        Cancel
      </Button>
     </div>

    </Modal>
  )
}
