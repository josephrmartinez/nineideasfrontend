import React, { useState, useEffect } from 'react';
import { ToggleLeft, ToggleRight } from "@phosphor-icons/react";

const VisibilityToggle = () => {
    const [privateList, setPrivateList] = useState(true)

    const handleClick = () => {
        setPrivateList(!privateList);
    };

return (
<div 
    className='flex flex-row items-center w-[86px] justify-between'
    >
    {privateList ? 
    <>
    <ToggleLeft size={24} className='cursor-pointer' onClick={handleClick}/>
    <div className='text-sm uppercase select-none'>private</div>
    </>
    : <>
    <ToggleRight size={24} className='cursor-pointer' onClick={handleClick}/>
    <div className='text-sm uppercase select-none'>public</div>
    </>}
</div>

)
}

export default VisibilityToggle