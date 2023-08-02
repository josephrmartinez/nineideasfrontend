import { useState } from 'react'
import '../App.css'
import { ListPlus, StackSimple } from "@phosphor-icons/react";
import { Outlet, NavLink } from "react-router-dom";


export default function Root(){
  
  return (
    <div className='mx-auto'>
      <div className='flex flex-row w-full justify-between items-center h-14 border-b-2 px-4'>
        <div className='grid grid-cols-2 gap-4'>
          <StackSimple size={24} className='cursor-pointer' />
          <ListPlus size={24} className='cursor-pointer' />
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='text-sm cursor-pointer'>log in</div>
          <div className='text-sm cursor-pointer'>sign up</div>
        </div>
      </div>
      <Outlet />
    </div>    
  )
}




