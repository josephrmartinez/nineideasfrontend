import { useState, useEffect } from 'react';
import '../App.css';
import { ListPlus, StackSimple } from "@phosphor-icons/react";
import { Outlet, NavLink, useMatch } from "react-router-dom";
import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';



export default function Root() {
  const isLoginActive = useMatch("/login");
  const isSignupActive = useMatch("/signup");
  const isListsActive = useMatch("/lists")
  const isAddListActive = useMatch("/")
  const isUserActive = useMatch("/user/:userId")

  const { userData, isLoggedIn, handleLogout } = useAuth()
  const navigate = useNavigate()

  function handleSignout(){
    handleLogout()
    navigate('/')
  }


  return (
    <div className='min-h-screen flex flex-col'>
      <div className='h-14 border-b-2 px-4'>
        <div className='flex flex-row w-full justify-between items-center h-full'>
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
                <NavLink to={`/user/${userData.userId}`} className={`text-sm cursor-pointer ${isUserActive ? 'text-[#ff3c00] font-semibold' : 'text-neutral-700'}`}>
                  {userData?.username}
                </NavLink>
                <div className="text-sm cursor-pointer text-neutral-700" onClick={()=> handleSignout()}>sign out</div>
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
      </div>
      <div className={`h-[calc(100vh-3.5rem)] overflow-y-auto`}>
        <Outlet />
      </div>
      
    </div>
  );
}


