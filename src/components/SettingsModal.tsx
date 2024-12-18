'use client'


import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Modal } from './Modal'
import { Inputs } from './inputs/Input'
import Image from 'next/image'
import { CldUploadWidget ,CloudinaryUploadWidgetResults} from 'next-cloudinary'
import { Button } from './inputs/Button'


type SettingsModalProps={
    currentUser:User
    isOpen:boolean
     onClose:()=>void
}

export const SettingsModal:React.FC<SettingsModalProps> = (
    {
        currentUser,
        isOpen,
        onClose
    }
) => {

    const route=useRouter();

    const [isLoading ,setIsLoading]=useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors,
        }

    }= useForm<FieldValues>({
        defaultValues:{
            name:currentUser.name,
            image:currentUser.iamge


        }
    })

    const image= watch("image")
   


    const handleUpload=(results:CloudinaryUploadWidgetResults)=>{
        if (results.event === 'success' && results.info && typeof results.info !== 'string') {
            setValue("image",results?.info?.secure_url,{
                shouldValidate:true
            })

        }
       
    }

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{

          setIsLoading(true)

          axios.post('/api/settings',data)
          .then(()=>{
            route.refresh()
            onClose()
          })
          .catch(()=> toast.error('something went wrong'))
          .finally(()=>setIsLoading(false))


    }
  return (
    <div>
        <Modal
          isOpen={isOpen}
          onClose={onClose}

        >
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className='space-y-12'>
                    <div className='border-b border-gray-900/10 pb-12'>
                   
                     <h2 className='text-base font-semibold leading-7 text-gray-900'>
                        Profial
                     </h2>
                     <p className='text-sm text-gray-600'>
                        Edit your information.
                     </p>

                     <div className='mt-10 flex flex-col gap-y-8'>
                        <Inputs

                           disabled={isLoading}
                           label='Name'
                           id='name'
                           errors={errors}
                           required
                           register={register}
                         
                         />

                         <div>
                            <label htmlFor="">Photo</label>

                            <div className='mt-2 flex items-center gap-x-3'>
                                <Image
                                  width='50'
                                  height='40'
                                  className='w-[50px] h-[50px] rounded-full object-cover'
                                  src={image || currentUser.iamge || '/assets/images/user.jpg'}
                                  alt='Avatar'
                                />

                                <CldUploadWidget
                                 uploadPreset="messager"
                                 onSuccess={(results)=>handleUpload(results)}
                                 >
                                  {({ open }) => {
                                    return (
                                 <Button 
                                   onClick={()=>open()}
                                   secondary
                                   type='button'
                                 >                          
                                    Change
                                 </Button>
                                  );
                                 }}
                                </CldUploadWidget>
                            </div>
                         </div>

                     </div>

                    </div>

                    <div
                     className='mt-6 flex  items-center justify-end gap-x-6'
                    >
                        <Button
                         disabled={isLoading}
                         secondary
                         onClick={onClose}
                         type='button'
                        >
                            Cancel

                        </Button>
                        <Button
                         disabled={isLoading}
                        
                        
                         type='submit'
                        >
                           Save

                        </Button>

                    </div>
                </div>


            </form>

        </Modal>
    </div>
  )
}
