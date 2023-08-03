import { useState } from 'react'
import '../App.css'
import { ListPlus, StackSimple } from "@phosphor-icons/react";
import { Outlet, NavLink } from "react-router-dom";


export default function Root(){
  
  return (
    <div className='mx-auto'>
      <div className='flex flex-row w-full justify-between items-center h-14 border-b-2 px-4'>
        <div className='grid grid-cols-2 gap-6'>
          <NavLink 
            to={`/`} 
            isActive={(match, location) => {
              return match !==null;
            }}>
              {({isActive}) => (
                <ListPlus size={24} className='cursor-pointer' color={isActive ? '#ff3c00' : '#636062'} weight={isActive ? 'duotone' : 'light'} />
              )}
            
          </NavLink>
          <NavLink 
            to={`/lists`} 
            isActive={(match, location) => {
              return match !==null;
            }}>
              {({isActive}) => (
                <StackSimple size={24} className='cursor-pointer' color={isActive ? '#ff3c00' : '#636062'} weight={isActive ? 'duotone' : 'light'} />
              )}
            
          </NavLink>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <NavLink 
            to={`/login`}
            className={({ isActive }) =>
          isActive
            ? `font-semibold text-[#ff3c00]` : `text-neutral-700` }>
            <div className='text-sm cursor-pointer'>log in</div>
          </NavLink>
          <NavLink 
            to={`/signup`}
            className={({ isActive }) =>
          isActive
            ? `font-semibold text-[#ff3c00]` : `text-neutral-700` }>
            <div className='text-sm cursor-pointer w-14'>sign up</div>
          </NavLink>
          
        </div>
      </div>
      <Outlet />
    </div>    
  )
}




