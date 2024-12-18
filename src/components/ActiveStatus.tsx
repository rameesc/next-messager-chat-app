'use client'



import { useAciveChannel } from '@/hooks/useAciveChannel'
import { useEffect } from 'react'


export const ActiveStatus = () => {

    const callthis=()=>{
        return  useAciveChannel()

    }

    useEffect(()=>{
        callthis()
    },[])

    

    
    return(
        <div>.</div>
    )
}
