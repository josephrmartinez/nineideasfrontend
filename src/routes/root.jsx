import { useState, useEffect } from 'react';
import '../App.css';
import { ListPlus, StackSimple } from "@phosphor-icons/react";
import { Outlet, NavLink, useMatch } from "react-router-dom";
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import axios from 'axios';



export default function Root() {
  const isLoginActive = useMatch("/login");
  const isSignupActive = useMatch("/signup");
  const isListsActive = useMatch("/lists")
  const isAddListActive = useMatch("/")

  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  // Function to get the value of the accessToken cookie
  const getAccessTokenCookie = () => {
    return Cookies.get('accessToken');
  };


  // Decode the JWT to get user ID and username
  const decodeToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Failed to decode JWT:', error.message);
      return {};
    }
  };

  // Retrieve the accessToken cookie when the component mounts
  useEffect(() => {
    const accessToken = getAccessTokenCookie();
    console.log("Access Token from Cookie:", accessToken);
    if (accessToken) {
      setToken(accessToken);
      setIsLoggedIn(true);
    }
  }, []);

 // Decode the token and get user ID and username
 useEffect(() => {
  if (token) {
    const decodedToken = decodeToken(token);
    if (decodedToken) {
      setUserData({ userId: decodedToken.userId, username: decodedToken.username });
    } else {
      setUserData(null);
    }
  } else {
    setUserData(null);
  }
}, [token]);


  // Function to handle logout action
  const handleLogout = () => {
    Cookies.remove('accessToken')
    setToken(null);
    setIsLoggedIn(false);
    setUserData(null);
  };


  // Set the accessToken in the Axios headers when it's available or changed
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);



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
