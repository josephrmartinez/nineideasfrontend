import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/authContext';
axios.defaults.withCredentials = true;
import { useNavigate } from 'react-router-dom';

export default function LogIn() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

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

    setLoading(true);

    // Make the POST request using axios
    axios
      .post('http://localhost:3000/api/users/login', formData)
      .then((response) => {
        console.log('headers:', response.headers)
        // Handle the response from the server if needed
        console.log('data:', response.data);
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        // Handle any errors that occur during the POST request
        console.error('Error:', error);
        setError('Invalid username or password.');
        setLoading(false);
      });
  };

  return (
    <div className="w-1/2 mx-auto mt-8">
      {error && <div className="text-red-500 mb-4">{error}</div>}
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
          disabled={loading}
        >
          {loading ? 'Logging In...' : 'Log In'}
        </button>
      </form>
    </div>
  );
}