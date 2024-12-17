import { usePathname } from "next/navigation"
import { useConversation } from "./useConversation"
import { useMemo } from "react"
import { signOut } from "next-auth/react"

import { TbLogout } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { IoChatbox } from "react-icons/io5";

export const useRoutes=()=>{

    const pathname=usePathname()

    const {conversationId}=useConversation()

    const routes = useMemo(()=>[
        {
            label:'Chat',
            href:'/conversation',
            icon:IoChatbox,
            active:pathname==`/conversation` || !!conversationId
        },
        {
            label:'Users',
            href:'/users',
            icon:FiUsers,
            active:pathname=='/users'
        },
        {
            label:'Logout',
            href:'#',
            onClick:()=>signOut(),
            icon:TbLogout
        }

    ],[pathname,conversationId])

    return routes
}