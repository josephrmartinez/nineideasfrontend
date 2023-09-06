import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true; // Ensure cookies are sent with requests
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import apiEndpoint from '../config';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAuthData, setUserAuthData] = useState(null);
  const [userId, setUserId] = useState("")
  const [userData, setUserData] = useState(null)

  // Function to make login API call
  const login = (formData) => {
    // Make the POST request using axios
    axios
      .post(`${apiEndpoint}/users/login`, formData)
      .then((response) => {
        // console.log('headers:', response.headers)
        // Handle the response from the server if needed
        // console.log('data:', response.data);
        // If the server responds with the user data, decode the token and update the userData state
        if (response.data) {
          const token = getAccessTokenCookie()
          console.log("token:", token)
          const decoded = decodeToken(token)
          setIsLoggedIn(true);
          // console.log("Printing decoded from authContext:", decoded)
          setUserAuthData({ userId: decoded.userId, username: decoded.username });
        }

      })
      .catch((error) => {
        // Handle any errors that occur during the POST request
        console.error('Error:', error);
      });
  };
  

  // Function to get the value of the accessToken cookie
  const getAccessTokenCookie = () => {
    return Cookies.get('nineideasAccessToken');
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

  useEffect(() => {
    const token = getAccessTokenCookie();
  
    const handleUserAuthData = async (token) => {
      if (token) {
        setAccessToken(token);
        setIsLoggedIn(true);
  
        const decodedToken = decodeToken(token);
        if (decodedToken) {
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
          setUserAuthData(null);
        }
  
        // Update Axios headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        setIsLoggedIn(false);
        setUserAuthData(null);
        delete axios.defaults.headers.common['Authorization'];
      }
    };
  
    handleUserAuthData(token);
  }, []);
  

  async function getUserData(userId) {
    try {
        const response = await axios.get(`${apiEndpoint}/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    } 
    };


// Function to handle logout action
const handleLogout = () => {
  Cookies.remove('nineideasAccessToken')
  setAccessToken(null);
  setIsLoggedIn(false);
  setUserAuthData(null);
  setUserData(null);
};


  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userAuthData, userData, userId, login, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );

}

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };






// Set the accessToken in the Axios headers when it's available or changed
// useEffect(() => {
//   if (accessToken) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//   } else {
//     delete axios.defaults.headers.common['Authorization'];
//   }
// }, [accessToken]);
