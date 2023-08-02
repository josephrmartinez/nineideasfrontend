import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowsCounterClockwise, ArrowsClockwise } from "@phosphor-icons/react";

const NewTopic = ({onClick}) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const getNewTopicAPI = () => {
    setIsSpinning(true)
    axios.get('http://localhost:3000/api/topic/new')
      .then((response) => {
        const topic = response.data.name;
        setTimeout(() => {
          onClick(topic); // Pass the topic back to the parent component after a 1000ms delay
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
    <div className='flex flex-row items-center'>
      <ArrowsClockwise
        size={24}
        className={`cursor-pointer mr-2 ${isSpinning ? 'animate-spin' : ''}`}
        onClick={getNewTopicAPI}
      />
      <div className='text-sm uppercase select-none'>topic</div>
    </div>



    
  );
};

export default NewTopic;
