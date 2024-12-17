import Image from 'next/image'
import React from 'react'
import { AuthForm } from './components/AuthForm'

const HomePage = () => {
  return (
    <div className=' bg-slate-300 flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full  flex-col flex justify-center items-center sm:max-w-md'>
           <Image
            alt='Logo'
            height={48}
            width={48}
            className='max-auto w-auto' 
            src={'/assets/images/logo.png'}
           />
           <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
              Sign in to your account
           </h2>
        </div>
        <AuthForm/>
    </div>
  )
}

export default HomePage