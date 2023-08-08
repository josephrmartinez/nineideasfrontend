import { useEffect, useState, useRef } from 'react'
import '../App.css'
import VisibilityToggle from '../components/VisibilityToggle';
import PopupModal from '../components/PopupModal';
import { ArrowsClockwise, ToggleLeft } from "@phosphor-icons/react";
import axios from 'axios';
import { useAuth } from '../contexts/authContext';
import IdeasList from '../components/IdeasList';

export default function AddList(){
  const [topic, setTopic] = useState('')
  const [currentIdea, setCurrentIdea] = useState("")
  const [ideaList, setIdeaList] = useState([])

  const [buttonActive, setButtonActive] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false);
  const { isLoggedIn } = useAuth()
  const [showPopup, setShowPopup] = useState(false)
  const ideaInputRef = useRef(null)

  const fillWidth = `${((ideaList.length) / 9) * 100}%`;

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


  // IN PROGRESS
  const postNewListAPI = () => {
    axios.post('http://localhost:3000/api/lists/', VALUES)
  }

  useEffect(() => {
    console.log("ran useEffect")
    getNewTopicAPI()
  }, [])



  function handleLoggedOutClick(){
    console.log("clockly")
    setShowPopup(true)
  }

  function handlePopupClose(){
    setShowPopup(false)
  }



  // Functions for idea management

  function handleAddIdea() {
    // handleAddIdeaAudio.currentTime = 0;
    // handleAddIdeaAudio.play();

    setButtonActive(true)
    
    setTimeout(() => {
        setButtonActive(false);
      }, 100);
    if (currentIdea.trim().length < 3) return;
    if (ideaList.includes(currentIdea)) return;
    setIdeaList(prevIdeas => {
      return [currentIdea, ...prevIdeas]
    })
    // SEND POST REQUEST TO CREATE LIST
    setCurrentIdea("")
    ideaInputRef.current.focus()
  }


  function handleIdeaInputChange(event) {
    setCurrentIdea(event.target.value)
  }

  function checkForSubmit(event) {
    if (currentIdea.trim().length < 3) return;
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddIdea()
    }
  }

  // Update already posted idea
  function updateIdea(index, idea) {
    setIdeaList(prevList =>
      prevList.map((prevIdea, i) => {
        if (i === index) {
          return idea;
        } else {
          return prevIdea;
        }
      })
    );
  }






  return (
    <div className='mx-auto'>
      <div className='w-[22rem] mx-auto'>
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
        className='w-[22rem] h-20 mb-3 outline-none border bg-neutral-50'
        value={currentIdea}
        ref={ideaInputRef}
        autoFocus
        onChange={handleIdeaInputChange}
        onKeyDown={checkForSubmit}
      >
      </textarea> 
      

      </div>
      <div className='w-[22rem] h-4 mb-4 mx-auto rounded-full border relative'>  
        <div className='absolute left-0 top-0 h-full rounded-full shadow-lg'
          style={{ width: fillWidth, background: "linear-gradient(to bottom, #6cb00e, #005c14)", transition: "width 0.4s cubic-bezier(0.3, .15, 0.35, 1)" }}>
        </div>
      </div>
      <div className='w-80 mx-auto'>
      { ideaList.length < 9 ? 
      <button className={`pushable ${buttonActive ? 'active' : ''}`} onClick={handleAddIdea}>
        <span className="shadow"></span>
        <span className="edge"></span>
        <span className="front">
          add idea
        </span>
      </button>
      :
    
        <button className="pushable complete">
          <span className="shadow"></span>
          <span className="edge"></span>
          <span className="front">
            list complete
          </span>
      </button>  }
      </div>
      
      {ideaList.length > 0 && 
      <div className='w-full border-t-2 mx-auto mt-8 overflow-y-scroll h-64'>
        <div className='w-[22rem] mx-auto'>
          <IdeasList ideaList={ideaList} updateIdea={updateIdea} />
        </div>
      </div>
      }
      
      


      {showPopup && <PopupModal  onClose={handlePopupClose}/>}

      </div>
    
  )
}
