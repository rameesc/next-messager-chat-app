


import { getUsers } from '@/actions/getUser'
import { Sidebar } from '@/components/Sidebar'
import React from 'react'
import { UserList } from './components/UserList '


type UserLayoutProps={
    children:React.ReactNode
}

const UserLayout =async ({children}:UserLayoutProps) => {

  const users=await getUsers()
  

  return (

    <Sidebar>
     <div className='h-full'>
      
        <UserList items={users}/>
        {children}
     </div>
    </Sidebar>
  )
}

export default UserLayout