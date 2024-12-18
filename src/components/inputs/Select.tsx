'use client'

import React from 'react'
import ReactSelect,{MultiValue,ActionMeta} from 'react-select'

type SelectProps={
    label:string;
    value?:Record<string, unknown>;
    onChange:(newValue: MultiValue<unknown>, actionMeta: ActionMeta<unknown>)=>void
    options:Record<string,unknown>[];
    disabled?:boolean;
    
}

export const Select:React.FC<SelectProps> = ({
    label,
    value,
    onChange,
    options,
    disabled
}) => {
  return (
    <div className=' z-[100]'>
        <label htmlFor="" className='block text-sm font-medium leading-6 text-gray-900'>
            {label}
        </label>
        <div className='mt-2'>
            <ReactSelect
             isDisabled={disabled}
             value={value}
             onChange={onChange}
             isMulti={true}
             options={options}
             menuPortalTarget={document.body}
             styles={{
                menuPortal:(base)=>({
                    ...base,
                    zIndex:9999
                })
             }}
             classNames={{
                control:()=>"text-sm"
             }}
            />
        </div>
    </div>
  )
}
