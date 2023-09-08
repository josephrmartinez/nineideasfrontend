import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true; // Ensure cookies are sent with requests
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import apiEndpoint from '../config';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // const [accessToken, setAccessToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAuthData, setUserAuthData] = useState(null);
  const [userData, setUserData] = useState(null)



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
          const fetchedUserData = await getUserData(decodedToken.userId);
          setUserData(fetchedUserData);
          // console.log("Fetched user data in authContext:", fetchedUserData);
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Handle the error gracefully, you might want to set an error state
        }
      } else {
        setIsLoggedIn(false);
        setUserAuthData(null);
        setUserData(null);
      }

      // Update Axios headers?
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      return null
      // delete axios.defaults.headers.common['Authorization'];
    }
  };



 function getTokenFromLocalStorage(){
  const token = localStorage.getItem('nineideasAccessToken')
  return token
 }

 function setTokenInLocalStorage(token){
  localStorage.setItem('nineideasAccessToken', token)
 }

 

  async function getUserData(userId) {
    try {
        const response = await axios.get(`${apiEndpoint}/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    } 
    };



// Function to handle logout action when using JWT
const handleLogout = () => {
  localStorage.clear('nineideasAccessToken')
  setIsLoggedIn(false);
  setUserAuthData(null);
  setUserData(null);
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
      value={{ isLoggedIn, userAuthData, userData, login, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );

}

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };




 // useEffect(() => {
  //   const token = getAccessTokenCookie();
  //   handleToken(token);
  // }, []);

//   const handleCookieAfterResponse = async (response) => {
//     // Check if the response contains the 'nineideasAccessToken' cookie
//   if (response.headers['set-cookie']) {
//     const token = extractTokenFromResponse(response);
//     if (token) {
//       // Set the retrieved token in the cookie
//       Cookies.set('nineideasAccessToken', token, { path: '/' });
//       console.log('Token set in cookie:', token);
//     }
//   }
// };

// // Function to extract the token from the response
// const extractTokenFromResponse = (response) => {
//   // Implement logic to extract the token from the response headers or body
//   // For example, if it's in the response headers:
//   return response.headers['set-cookie'].find((cookie) =>
//     cookie.startsWith('nineideasAccessToken')
//   );
// };


// // Function to get the value of the accessToken cookie
// const getAccessTokenCookie = () => {
//   const token = Cookies.get('nineideasAccessToken');
//   console.log("token from getAccessToken:", token)
//   return token;
// };


// // Function to handle logout action when using cookies
// const handleLogout = () => {
//   Cookies.remove('nineideasAccessToken')
//   setAccessToken(null);
//   setIsLoggedIn(false);
//   setUserAuthData(null);
//   setUserData(null);
// };



  // // Function to make login API call
  // const login = async (formData) => {
  //   try {
  //     const response = await axios.post(`${apiEndpoint}/users/login`, formData);
  //     // Log specific headers
  //   console.log('Content-Type header:', response.headers.get('content-type'));
  //   console.log('Set-Cookie header:', response.headers.get('set-cookie'));
  //     console.log('data:', response.data);
      
  //     if (response.data) {
  //       await handleCookieAfterResponse(response);
  //       const token = getAccessTokenCookie();
  //       console.log("token from login:", token);
  //       const decoded = decodeToken(token);
  //       setIsLoggedIn(true);
  //       setUserAuthData({ userId: decoded.userId, username: decoded.username });
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };
    
  


// Set the accessToken in the Axios headers when it's available or changed
// useEffect(() => {
//   if (accessToken) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//   } else {
//     delete axios.defaults.headers.common['Authorization'];
//   }
// }, [accessToken]);
