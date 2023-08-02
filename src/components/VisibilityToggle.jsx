import React, { useState, useEffect } from 'react';
import { ToggleLeft, ToggleRight } from "@phosphor-icons/react";

const VisibilityToggle = () => {
    const [privateList, setPrivateList] = useState(true)

    const handleClick = () => {
        setPrivateList(!privateList);
    };

return (
<div 
    className='grid grid-cols-2 items-center justify-items-center'
    onClick={handleClick}>
    {privateList ? 
    <>
    <ToggleLeft size={24} className='cursor-pointer' />
    <div className='text-sm uppercase'>private</div>
    </>
    : <>
    <ToggleRight size={24} className='cursor-pointer' />
    <div className='text-sm uppercase'>public</div>
    </>}
</div>

)
}

export default VisibilityToggle