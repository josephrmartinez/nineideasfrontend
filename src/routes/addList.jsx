import { useEffect, useState } from 'react'
import '../App.css'
import VisibilityToggle from '../components/VisibilityToggle';
import PopupModal from '../components/PopupModal';
import { ArrowsClockwise, ToggleLeft } from "@phosphor-icons/react";
import axios from 'axios';
import { useAuth } from '../contexts/authContext';

export default function AddList(){
  const [topic, setTopic] = useState('')
  const [buttonActive, setButtonActive] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false);
  const { isLoggedIn } = useAuth()
  const [showPopup, setShowPopup] = useState(false)
  const fillWidth = 30

  const getNewTopicAPI = () => {
    setIsSpinning(true)
    setTopic('')
    axios.get('http://localhost:3000/api/topic/new')
      .then((response) => {
        const newTopic = response.data.name;
        setTimeout(() => {
          
          setTopic(newTopic); // Pass the topic back to the parent component after a 1000ms delay
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

  useEffect(() => {
    console.log("ran useEffect")
    getNewTopicAPI()
  }, [])

  function handleAddIdea() {
    setButtonActive(true)  
    setTimeout(() => {
        setButtonActive(false);
      }, 100);
  }

  function handleLoggedOutClick(){
    console.log("clockly")
    setShowPopup(true)
  }

  function handlePopupClose(){
    setShowPopup(false)
  }

  return (
    <div className='mx-auto'>
      <div className='w-96 mx-auto'>
      <div className='flex flex-row w-full justify-between items-center h-14'>
        <div className='flex flex-row items-center'>
          <ArrowsClockwise
            size={24}
            className={`cursor-pointer mr-2 ${isSpinning ? 'animate-spin' : ''}`}
            onClick={getNewTopicAPI}
          />
          <div className='text-sm uppercase select-none'>topic</div>
      </div>
        { isLoggedIn ? <VisibilityToggle /> :
        <div className='flex flex-row items-center w-[86px] justify-between'>
          <ToggleLeft size={24} className='cursor-pointer' onClick={handleLoggedOutClick}/>
          <div className='text-sm uppercase select-none'>private</div>
        </div>
        }
      </div>
      <div className='text-left mb-2 h-12'>
        {topic}{topic ? ':' : ''}
      </div>

      <textarea
        className='w-96 h-20 mb-3 outline-none border bg-neutral-50'
        // value={currentIdea}
        // ref={ideaInputRef}
        autoFocus
        // onChange={handleIdeaInputChange}
        // onKeyDown={checkForSubmit}
      >
      </textarea> 
      

      </div>
      <div className='w-96 h-4 mb-4 mx-auto rounded-full border relative'>  
        <div className='absolute left-0 top-0 h-full rounded-full shadow-lg'
          style={{ width: fillWidth, background: "linear-gradient(to bottom, #6cb00e, #005c14)", transition: "width 0.4s cubic-bezier(0.3, .15, 0.35, 1)" }}>
        </div>
      </div>
      <div className='w-80 mx-auto'>
      <button className={`pushable ${buttonActive ? 'active' : ''}`} onClick={handleAddIdea}>
        <span className="shadow"></span>
        <span className="edge"></span>
        <span className="front">
          add idea
        </span>
      </button>
      </div>

      {showPopup && <PopupModal  onClose={handlePopupClose}/>}

      </div>
    
  )
}
