import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true; // Ensure cookies are sent with requests
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Function to make login API call
  const login = (formData) => {
    // Make the POST request using axios
    axios
      .post('http://localhost:3000/api/users/login', formData)
      .then((response) => {
        console.log('headers:', response.headers)
        // Handle the response from the server if needed
        console.log('data:', response.data);
        // If the server responds with the user data, decode the token and update the userData state
        if (response.data) {
          const token = getAccessTokenCookie()
          const decoded = decodeToken(token)
          setIsLoggedIn(true);
          console.log(decoded)
          setUserData({ userId: decoded.userId, username: decoded.username });
        }

      })
      .catch((error) => {
        // Handle any errors that occur during the POST request
        console.error('Error:', error);
      });
  };
  

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
  console.log("Access Token from Cookie:", token);
  if (token) {
    setAccessToken(token);
    setIsLoggedIn(true);

    // Decode the token and get user ID and username
    const decodedToken = decodeToken(token);
    if (decodedToken) {
      setUserData({ userId: decodedToken.userId, username: decodedToken.username });
    } else {
      setUserData(null);
    }
  }
}, []);


// Function to handle logout action
const handleLogout = () => {
  Cookies.remove('accessToken')
  setAccessToken(null);
  setIsLoggedIn(false);
  setUserData(null);
};


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
      value={{ isLoggedIn, userData, login, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );

}

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };

