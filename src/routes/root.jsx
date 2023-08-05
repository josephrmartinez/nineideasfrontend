import { useState, useEffect } from 'react';
import '../App.css';
import { ListPlus, StackSimple } from "@phosphor-icons/react";
import { Outlet, NavLink, useMatch } from "react-router-dom";
import { useAuth } from '../contexts/authContext';


export default function Root() {
  const isLoginActive = useMatch("/login");
  const isSignupActive = useMatch("/signup");
  const isListsActive = useMatch("/lists")
  const isAddListActive = useMatch("/")

  const { userData, isLoggedIn, handleLogout } = useAuth()

  return (
    <div className='mx-auto'>
      <div className='flex flex-row w-full justify-between items-center h-14 border-b-2 px-4'>
        <div className='grid grid-cols-2 gap-6'>
          <NavLink to={`/`}>
              <ListPlus size={24} className={`cursor-pointer ${isAddListActive ? 'text-[#ff3c00]' : 'text-[#636062]'}`} />
          </NavLink>
          <NavLink to={`/lists`}>
              <StackSimple size={24} className={`cursor-pointer ${isListsActive ? 'text-[#ff3c00]' : 'text-[#636062]'}`} />
          </NavLink>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          {isLoggedIn ? (
            <>
              <div className="text-sm cursor-pointer text-neutral-700" onClick={() => console.log(userData)}>
                {userData?.username}
              </div>
              <div className="text-sm cursor-pointer text-neutral-700" onClick={()=> handleLogout()}>sign out</div>
            </>
          ) : (
            <>
              <NavLink to={`/login`} className="font-normal text-neutral-700">
                <div className={`text-sm cursor-pointer ${isLoginActive ? 'font-semibold text-[#ff3c00]' : ''}`}>log in</div>
              </NavLink>
              <NavLink to={`/signup`} className="font-normal text-neutral-700">
                <div className={`text-sm cursor-pointer w-14 ${isSignupActive ? 'font-semibold text-[#ff3c00]' : ''}`}>sign up</div>
              </NavLink>
            </>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
