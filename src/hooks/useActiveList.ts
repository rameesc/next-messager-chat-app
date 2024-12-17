
import {create} from 'zustand'


type ActiveListStore={

    members:string[];
    
   sender:string;
   typingRemove:()=>void;
   typing:(text:string)=>void;
    add:(id:string)=>void;
    remove:(id:string)=>void;
    set:(ids:string[])=>void
}

export const userActiveList =create<ActiveListStore>((set)=>({

    members:[],
    sender:'',
    typing:(text)=>set({sender:text}),
    typingRemove:()=>set({sender:''}),
    add:(id)=>set((state)=>({
        members:[...state.members,id]
    })),
    remove:(id)=>set((state)=>({
        members:state.members.filter((userId)=>userId!==id)
    })),
    set:(ids)=>set({members:ids}),
   

}))

