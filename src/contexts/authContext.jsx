import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import apiEndpoint from '../config';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAuthData, setUserAuthData] = useState(null);



  // Decode the JWT to get user ID and username
  const decodeToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Failed to decode JWT:', error.message);
      return null;
    }
  };

  const handleToken = async (token) => {
    if (token) {
      setTokenInLocalStorage(token)
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        setIsLoggedIn(true);
        try {
          setUserAuthData({ userId: decodedToken.userId, username: decodedToken.username });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setIsLoggedIn(false);
        setUserAuthData(null);
      }
    } else {
      return null
    }
  };

 function getTokenFromLocalStorage(){
  const token = localStorage.getItem('nineideasAccessToken')
  return token
 }

 function setTokenInLocalStorage(token){
  localStorage.setItem('nineideasAccessToken', token)
 }


// Function to handle logout action when using JWT
const authLogout = () => {
  localStorage.clear('nineideasAccessToken')
  setIsLoggedIn(false);
  setUserAuthData(null);
};

  
  // Function to make login API call
  const login = async (formData) => {
    try {
      const response = await axios.post(`${apiEndpoint}/users/login`, formData);
      // Log specific headers
      console.log('login response data:', response.data);
      
      if (response.data) {
        handleToken(response.data.token);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => {
    const token = getTokenFromLocalStorage();
    console.log("Token fetched from localStorage in authContext useEffect:", token)
    if (token) {
      handleToken(token);
    }}, []);
  

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userAuthData, login, authLogout }} //userData
    >
      {children}
    </AuthContext.Provider>
  );

}

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
