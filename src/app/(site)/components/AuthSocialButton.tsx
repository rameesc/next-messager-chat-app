

import {IconType} from 'react-icons'

import React from 'react'

type AuthSocialButtonProps={
    Icon:IconType,
    onClick:()=>void
}

export const AuthSocialButton:React.FC<AuthSocialButtonProps> = ({
    Icon,
    onClick
}) => {
  return (
    <button
     type='button'
     onClick={onClick}
      className='inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
     >
        <span><Icon/></span>
     </button>
  )
}
