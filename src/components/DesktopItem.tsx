'use client'


import clsx from 'clsx';
import Link from 'next/link';
import React from 'react'
import { IconType } from 'react-icons';

type DesktopItemProps={

    key:string;
    href:string;
    label:string;
   icon:IconType;
   active?:boolean;
    onClick?:()=>void
}

export const DesktopItem:React.FC<DesktopItemProps> = ({
   
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
   <li onClick={handleClick}>
    
    <Link 
     href={href}
     className={clsx(`group flex gap-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100`,
        active&& "bg-red-200 text-black"
     )}
    >
     
        <Icon className=' h-6 w-6 shrink-0'/>
        <span className='sr-only'>{label}</span>
    </Link>
   </li>
  )
}
