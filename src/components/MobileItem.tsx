'use client'
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react'
import { IconType } from 'react-icons';

type MobileItemProps={

   
    href:string;
    label:string;
   icon:IconType;
   active?:boolean
    onClick?:()=>void
}

export const MobileItem:React.FC<MobileItemProps> = ({
  
    href,
    label,
    icon:Icon,
    active,
    onClick
}) => {

    const handleClick =()=>{
        if(onClick){

            return onClick()
        }
    }

  return (
     
    <Link 
     onClick={handleClick}
     href={href}
     className={clsx(`group w-full  flex justify-center gap-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100`,
        active&& "bg-black text-white"
     )}
    >
     
        <Icon className=' h-6 w-6 shrink-0'/>
        <span className='sr-only'>{label}</span>
    </Link>
  
  )
}
