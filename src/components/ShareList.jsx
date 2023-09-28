import React from 'react';
import { ShareNetwork } from "@phosphor-icons/react";



export default function ShareList({listData}) {
    const handleShareClick = async () => {
        let shareTopic = listData.topic.name

      if (navigator.share) {
        try {

            
          await navigator.share({
            title: `${shareTopic}`,
            text: `${shareTopic}`,
            url: `https://nineideas.net/lists/${listData._id}`
          });
          console.log('Link shared successfully');
        } catch (error) {
          console.error('Error sharing link:', error);
        }
      } else {
        // Fallback for browsers that don't support the Web Share API
        const urlToCopy = `https://nineideas.net/lists/${listData._id}`; // Replace with your actual URL
        try {
          await navigator.clipboard.writeText(urlToCopy);
          alert('List URL copied to clipboard');
        } catch (error) {
          console.error('Error copying link to clipboard:', error);
          alert('Unable to copy URL to clipboard.');
        }
      }
    };
  
  
    return (
        <ShareNetwork className="cursor-pointer mx-4" onClick={handleShareClick} size={20} weight={"regular"} color={"#666666"}/>
    );
  }