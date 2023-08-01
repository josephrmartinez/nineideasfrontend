import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowsCounterClockwise, ArrowsClockwise } from "@phosphor-icons/react";

const NewTopic = ({getNewTopic}) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const getNewTopicAPI = () => {
    setIsSpinning(true)
    axios.get('http://localhost:3000/api/topic/new')
      .then((response) => {
        const topic = response.data.name;
        setTimeout(() => {
          getNewTopic(topic); // Pass the topic back to the parent component after a 1000ms delay
        }, 300);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setTimeout(()=>{
          setIsSpinning(false);
        }, 300);
        });
      
  };

  return (
    <ArrowsClockwise
      size={24}
      className={`cursor-pointer ${isSpinning ? 'animate-spin' : ''}`}
      onClick={getNewTopicAPI}
    />
  );
};

export default NewTopic;
