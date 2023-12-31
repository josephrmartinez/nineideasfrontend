import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import apiEndpoint from '../config';


export default function SignUp(){
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    bio: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form data before sending the POST request
    if (!formData.username || !formData.password || !formData.confirmPassword ) {
      alert('Please fill in all required fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match. Please re-enter your password.');
        return;
      }


    // Remove the confirmPassword property from formData
    const { confirmPassword, ...postData } = formData;

    // Make the POST request using axios
    axios
      .post(`${apiEndpoint}/users`, postData)
      .then((response) => {
        // Handle the response from the server if needed
        console.log("Sign up data:", response.data);
        
        // Log in the user after successful signup
        login({
          username: formData.username,
          password: formData.password,
        });
        navigate('/')

      })
      .catch((error) => {
        // IMPROVE THIS USERNAME ALREADY TAKEN ERROR HANDLING
        if (error.response && error.response.data.error && error.response.data.error.keyPattern) {
          const key = Object.keys(error.response.data.error.keyPattern)[0];
          alert('Username already taken');
        } else {
          console.log('An unexpected error occurred:', error);
        }
      });
    }

  return (
    <div className="w-56 mx-auto mt-8">
      <form onSubmit={handleSubmit}>
        
        <div className="mb-4">
          <label htmlFor="username">username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            autoCapitalize="none" 
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password">password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword">confirm password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bio">profile line:</label>
          <input
            id="bio"
            name="bio"
            value={formData.bio}
            placeholder='max 42 characters'
            onChange={handleChange}
            autoCapitalize="none" 
            className="w-full px-3 py-2 border rounded"
            maxLength="42"
          />
        </div>
        <button type="submit" className="px-4 py-2 my-4 bg-[#11699c] text-white rounded-lg">
          Sign Up
        </button>
        
      </form>
    </div>
  );
};


