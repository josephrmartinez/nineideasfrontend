import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';


export default function SignUp(){
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    bio: '',
    email: '',
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
    if (!formData.username || !formData.password || !formData.confirmPassword || !formData.bio || !formData.email) {
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
      .post('http://localhost:3000/api/users', postData)
      .then((response) => {
        // Handle the response from the server if needed
        console.log(response.data);
        
        // Log in the user after successful signup
        login({
          username: formData.username,
          password: formData.password,
        });
        navigate('/')

      })
      .catch((error) => {
        // Handle any errors that occur during the POST request
        console.error('Error:', error);
      });
  };

  return (
    <div className="w-1/2 mx-auto mt-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password:</label>
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
          <label htmlFor="confirmPassword">Confirm Password:</label>
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
          <label htmlFor="bio">Bio (limit to 30 characters):</label>
          <input
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            maxLength="30"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="px-4 py-2 my-4 bg-[#11699c] text-white rounded-lg">
          Sign Up
        </button>
      </form>
    </div>
  );
};


