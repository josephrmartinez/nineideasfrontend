import React, { useState, useEffect } from 'react';
import { ToggleLeft, ToggleRight, LockLaminated, LockKeyOpen } from "@phosphor-icons/react";

const VisibilityToggle = ({publicList, onToggleClick}) => {

return (

<div className='flex flex-row items-center justify-between outline outline-1 outline-neutral-200 active:bg-neutral-100 shadow-sm rounded-full px-3 py-1 cursor-pointer text-neutral-600'>
    {!publicList ? 
    <>
    <div className='text-sm uppercase select-none cursor-pointer' onClick={onToggleClick}>private</div>
    </>
    : <>
    <div className='text-sm uppercase select-none cursor-pointer' onClick={onToggleClick}>public</div>
    </>}
</div>

)
}

export default VisibilityToggle