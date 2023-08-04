import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

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
      return null;
    }
  };

  // Retrieve the accessToken cookie when the component mounts
  useEffect(() => {
    const token = getAccessTokenCookie();
    if (token) {
      setAccessToken(token);
      setIsLoggedIn(true);

      // Decode the token and get user ID and username
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        console.log(decodeToken)
        setUserData({ userId: decodedToken.userId, username: decodedToken.username });
      } else {
        setUserData(null);
      }
    }
  }, []);


  // Function to handle logout action
  const handleLogout = () => {
    setAccessToken(null);
    setIsLoggedIn(false);
    setUserData(null);
    // Perform any additional cleanup or logout logic here
  };

  // Retrieve the accessToken cookie when the component mounts
  useEffect(() => {
    const token = getAccessTokenCookie();
    if (token) {
      setAccessToken(token);
      setIsLoggedIn(true);
    }
  }, []);

  // Set the accessToken in the Axios headers when it's available or changed
  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userData, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
