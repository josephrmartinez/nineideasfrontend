import React, { useState, useEffect } from 'react';
import { ToggleLeft, ToggleRight, LockLaminated, LockKeyOpen } from "@phosphor-icons/react";

const VisibilityToggle = ({publicList, onToggleClick}) => {

return (
<div 
    className='flex flex-row items-center w-[86px] justify-between text-neutral-600'
    >
    {!publicList ? 
    <>
    <LockLaminated size={24} weight="light" className='cursor-pointer' onClick={onToggleClick}/>
    <div className='text-sm uppercase select-none'>private</div>
    </>
    : <>
    <LockKeyOpen size={24} weight="light" className='cursor-pointer' onClick={onToggleClick}/>
    <div className='text-sm uppercase select-none'>public</div>
    </>}
</div>

)
}

export default VisibilityToggle