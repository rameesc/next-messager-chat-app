'use client';


import { useConversation } from '@/hooks/useConversation'
import axios from 'axios'
import React, { useEffect } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { IoMdPhotos } from "react-icons/io";
import { MessageInput } from './MessageInput'
import { IoIosSend } from "react-icons/io";
import { CldUploadWidget,CloudinaryUploadWidgetResults} from "next-cloudinary"



export const Form = () => {

  
    

    const {conversationId} = useConversation()
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors,
        }

    } = useForm<FieldValues>({
        defaultValues:{
            message:''

        }
    })

    const messageinput=watch('message')

    useEffect(()=>{
      fetch("/api/typing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender: "User" }),
      });
    

    },[messageinput])

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
         
        setValue('message','',{shouldValidate:true})

        axios.post('/api/messages',{
            ...data,
            conversationId:conversationId
        })

    }

    const handleUpload=(results:CloudinaryUploadWidgetResults)=>{
      if (results.event === 'success' && results.info ) {

        const imageUrl = results.info.secure_url;

        axios.post('/api/messages',{
          image:imageUrl,
          conversationId:conversationId

       })


      }else {
        console.error('Unexpected result:', results);
      }
        
        

      
          
       


        

    }

  return (
    <div className='py-4 px-4   bg-white border-t flex items-center  gap-2  lg:gap-4 w-full'>
        
          
        

      <CldUploadWidget 
       uploadPreset="messager"
       onSuccess={(results)=>handleUpload(results)}
       >
        {({ open }) => {
            return (
       <button onClick={() => open()}>
         < IoMdPhotos size={30}/>
       </button>
        );
       }}
      </CldUploadWidget>

        <form onSubmit={handleSubmit(onSubmit)}
          className='flex items-center gap-2 lg:gap-4 w-full'
        >
            <MessageInput
              
              id="message"
              register={register}
              error={errors}
              required
              placeholder="write a message"
            />
            <button
             type='submit'
             className='rounded-full text-white p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition'
            >
                <IoIosSend size={20}/>

            </button>

        </form>

    </div>
  )
}
