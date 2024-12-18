'use client'

import { Button } from '@/components/inputs/Button'
import { Inputs } from '@/components/inputs/Input'
import React, { useCallback, useEffect, useState } from 'react'
import {  FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { AuthSocialButton } from './AuthSocialButton'
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import axios from 'axios'
import toast from 'react-hot-toast'

import {signIn, useSession} from "next-auth/react"
import { useRouter } from 'next/navigation'


type Veriant ="LOGIN" | "REGISTER"

export const AuthForm = () => {

    const [variant,setVariant] = useState<Veriant>("LOGIN")

    const [loading,setLoading] = useState(false)
  
    const session =useSession()
    const router =useRouter()

    const toggleVariant = useCallback(()=> {

        if(variant=='LOGIN'){

            setVariant("REGISTER")
        }else{
            setVariant("LOGIN")
        }

    },[variant])

  

    useEffect(()=>{

      if(session.status=="loading"){
        <div>loading</div>
      }

      if(session.status==="authenticated"){
        
        router.push('/users')

      }

    },[session.status,router])

    const {
        register,
        handleSubmit,
        formState:{
            errors
        }
    } = useForm<FieldValues>({
        defaultValues:{
            name:'',
            password:'',
            email:''

        }
    })

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{

        setLoading(true)

        if(variant=="REGISTER"){

          axios.post('/api/register',data)

          .then((res)=>{
            signIn("credentials",data)
            toast.success(res.data.message)
            setLoading(false)
          })

          .catch((error)=>{
            toast.error(error.response.data)
           
            
          })
          .finally(()=>setLoading(false))
         
         


        }

        if(variant=="LOGIN"){

          signIn("credentials",{
            ...data,
            redirect:false
          })
          
          .then((callback)=>{

            if(callback?.error){
              toast.error("Invalid credentials")
            }

            if(callback?.ok  && !callback.error){

              toast.success("successfully logged in")
              router.push('/users')
            }
          })
          .finally(()=>setLoading(false))
                      


        }

    }

    const socialAction=(action:string)=>{

        signIn(action,{
          redirect:false
        })
        .then((callback)=>{

          if(callback?.error){
            toast.error("Invalid credentials")
          }

          if(callback?.ok  && !callback.error){
            toast.success("successfully logged in")
          }
        })
        .finally(()=>setLoading(false))
                    
        
    }

  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>

        <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
          <form 
           className='space-y-6'
           onSubmit={handleSubmit(onSubmit)}
          >
            {variant=="REGISTER"  && (
                 <Inputs 
                  errors={errors} 
                  disabled={loading} 
                 
                  label='name' 
                  id='name' 
                  register={register}
                 />
            )}
                <Inputs 
                  errors={errors} 
                  disabled={loading} 
                 
                  label='Email' 
                  id='email' 
                  register={register}
                />

                <Inputs 
                  errors={errors} 
                  disabled={loading} 
                 
                  label='Password' 
                  id='password' 
                  register={register}
                />

                <div>
                    <Button 
                      disabled={loading}
                      fullWidth
                      type='submit'
                    >
                        {variant=="LOGIN" ? "Sign in" : "Register"}
                    </Button>
                </div>
           
          </form>

          <div className='mt-6 '>

             
            <div className=' relative'>

                <div className=' absolute inset-0'>
                    <div className='border-b text-black h-2 w-full'/>
                </div>

                <div className='relative  flex justify-center text-sm'>

                    <span className='bg-white px-2 text-gray-500'>Or continue</span>
                </div>
            </div>

            <div className='mt-6 flex gap-2'>
             <AuthSocialButton 
              Icon={FaGithub}
              onClick={()=>socialAction("github")}
             />
             <AuthSocialButton 
              Icon={FaGoogle}
              onClick={()=>socialAction("google")}
             />
            </div>

            
          </div>
          <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>

            <div>
                {variant=='LOGIN'  ?'New to messager?':'Alredy have an account?'}
            </div>
            <div 
              onClick={toggleVariant}
              className='underline cursor-pointer'
              >
                {variant=='LOGIN' ? "Create an account" :'Login'}
              </div>
          </div>

        </div>

    </div>
  )
}
