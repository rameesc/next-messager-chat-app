


import React from 'react'
import { FieldError, FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

 type MessageInputProps={

 id:string;
 register:UseFormRegister<FieldValues>;
 error:FieldErrors;
 required?:boolean;
 placeholder?:string;
 type?:string
}

export const MessageInput:React.FC<MessageInputProps> = ({
    id,
    register,
    error,
    required,
    placeholder,
    type


}) => {
  return (
    <div className=' relative w-full'>
        <input
        
         id={id}
         type={type}
         autoComplete={id}
         {...register(id,{required:required})}
         placeholder={placeholder}
         className="
          text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none
         "

         />
    </div>
  )
}
