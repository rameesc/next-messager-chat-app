'use client'



import { useAciveChannel } from '@/hooks/useAciveChannel'
import { useEffect } from 'react'


export const ActiveStatus = () => {

    useEffect(()=>{
        return  useAciveChannel()
    },[])

    

    
    return(
        <div>.</div>
    )
}
