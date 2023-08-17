import React, { useState, useEffect } from 'react';
import { ToggleLeft, ToggleRight } from "@phosphor-icons/react";

const VisibilityToggle = ({privateList, onToggleClick}) => {

return (
<div 
    className='flex flex-row items-center w-[86px] justify-between text-neutral-600'
    >
    {privateList ? 
    <>
    <ToggleLeft size={24} className='cursor-pointer' onClick={onToggleClick}/>
    <div className='text-sm uppercase select-none'>private</div>
    </>
    : <>
    <ToggleRight size={24} className='cursor-pointer' onClick={onToggleClick}/>
    <div className='text-sm uppercase select-none'>public</div>
    </>}
</div>

)
}

export default VisibilityToggle