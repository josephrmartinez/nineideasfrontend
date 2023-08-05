import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';

export default function LogIn() {
  const { login } = useAuth()
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // const navigate = useNavigate();

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
    if (!formData.username || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }

    // Send the formData to the login function in useAuth
    login(formData)
    
    navigate('/');
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
        <button
          type="submit"
          className="px-4 py-2 my-4 bg-[#11699c] text-white rounded-lg"
        >
          log in
        </button>
      </form>
    </div>
  );
}