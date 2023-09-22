import '../App.css';
import { ListPlus, StackSimple } from "@phosphor-icons/react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';

export default function Root() {
  const { userAuthData, isLoggedIn, authLogout } = useAuth()
  const navigate = useNavigate()

  function handleLogout(){
    authLogout()
    navigate('/')
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='h-14 border-b-2 px-4'>
        <div className='flex flex-row w-full justify-between items-center h-full'>
          <div className='grid grid-cols-2 gap-6'>
            <NavLink 
              to={`/`} 
              className={({isActive, isPending}) =>
                  `cursor-pointer ${isActive ? 'text-[#ff3c00]' : isPending ? 'text-[#ff3c00] animate-pulse' : 'text-[#636062]'}`}
            >
                <ListPlus size={24} />
            </NavLink>
            <NavLink 
              to={`/lists`} 
              className={({isActive, isPending}) =>
                  `cursor-pointer ${isActive ? 'text-[#ff3c00]' : isPending ? 'text-[#ff3c00] animate-pulse' : 'text-[#636062]'}`}>
                <StackSimple size={24} />
            </NavLink>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            {isLoggedIn ? (
              <>
                <NavLink 
                to={`/user/${userAuthData.userId}`} 
                className={({isActive, isPending}) =>
                  `text-sm cursor-pointer font-semibold ${isActive ? 'text-[#ff3c00] ' : isPending ? 'text-[#ff3c00] animate-pulse' : 'text-neutral-500'}`}>
                  {userAuthData?.username}
                </NavLink>
                <div className="text-sm cursor-pointer font-semibold text-neutral-500" onClick={()=> handleLogout()}>sign out</div>
              </>
            ) : (
              <>
                <NavLink to={`/login`} 
                className={({isActive, isPending}) =>
                `text-sm cursor-pointer font-semibold ${isActive ? 'text-[#ff3c00]' : 'text-neutral-500'}`}>
                  log in
                </NavLink>
                <NavLink to={`/signup`} className={({isActive, isPending}) =>
                `text-sm cursor-pointer font-semibold ${isActive ? 'text-[#ff3c00]' : 'text-neutral-500'}`}>
                  sign up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={`h-[calc(100vh-3.5rem)] overflow-y-auto`}>
        <Outlet/>
      </div>
      
    </div>
  );
}

