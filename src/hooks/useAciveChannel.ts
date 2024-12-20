

import  { useEffect,  useState } from 'react'
import { userActiveList } from './useActiveList'
import { Channel, Members } from 'pusher-js'
import { pusherClient } from '@/libs/pusher'

export const useAciveChannel = () => {

    const {set,add,remove}=userActiveList()

    const [activeChannel,setActiveChannel]=useState<Channel | null>(null)

    


    useEffect(()=>{

        let channel = activeChannel;

        if(!channel){
            channel= pusherClient.subscribe('presence-chat')

            setActiveChannel(channel)
        }
        channel.bind('pusher:subscription_succeeded',(members:Members)=>{

            console.log(members,'20')

            const initialMembers:string[] =[]

            members.each((member:Record<string,string>)=>{
                initialMembers.push(member.id)
            })

            set(initialMembers)

        })
          // Listen for new members joining
         channel.bind("pusher:member_added", (member:Record<string,string>) => {
           
            add(member.id);

         });

         // Listen for members leaving
        channel.bind("pusher:member_removed", (member:Record<string,string>) => {
          remove(member.id)
        });
      

        // channel.bind("user_typing", ( sender: string ) => {
        //     typing(`typing...`);
        //     if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        //     typingTimeoutRef.current = setTimeout(() => typingRemove(), 3000);
        //   });


        return ()=>{


            if(activeChannel){

                pusherClient.unsubscribe('presence-chat')
                setActiveChannel(null)
            }

        }
  

    },[activeChannel,set,add,remove])
  
}
