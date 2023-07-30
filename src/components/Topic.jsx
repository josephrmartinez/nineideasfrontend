import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Topic = () => {
  const [topic, setTopic] = useState('');

  useEffect(() => {
    // Make the API request to your backend endpoint using Axios
    axios.get('http://localhost:3000/api/topic/new')
      .then((response) => {
        setTopic(response.data.name);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      {topic ? (
        <p>{topic}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Topic;
