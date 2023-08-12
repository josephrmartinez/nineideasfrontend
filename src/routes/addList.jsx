import { useEffect, useState, useRef } from 'react'
import '../App.css'
import VisibilityToggle from '../components/VisibilityToggle';
import PopupModal from '../components/PopupModal';
import { ArrowsClockwise, ToggleLeft } from "@phosphor-icons/react";
import axios from 'axios';
import { useAuth } from '../contexts/authContext';
import IdeasList from '../components/IdeasList';

export default function AddList(){
  const [topic, setTopic] = useState({})
  const [currentIdea, setCurrentIdea] = useState("")
  const [ideaList, setIdeaList] = useState([])
  const [currentListId, setCurrentListId] = useState("")
  const [buttonActive, setButtonActive] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false);
  const { isLoggedIn, userData } = useAuth()
  const [showPopup, setShowPopup] = useState(false)
  const [privateList, setPrivateList] = useState(true)
  const ideaInputRef = useRef(null)
  const fillWidth = `${((ideaList.length) / 9) * 100}%`;

  const getNewTopic = async () => {
    try {
      setIsSpinning(true);
      setTopic({});
      const response = await axios.get('http://localhost:3000/api/topic/new');
      const newTopic = response.data;
      await new Promise(resolve => setTimeout(resolve, 300)); // Delay for 300ms
      setTopic(newTopic);
      setIsSpinning(false);
      setCurrentListId('');
      setIdeaList([]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  // GET NEW TOPIC WHEN COMPONENT MOUNTS
  // DEBUG: WHY IS THIS RUNNING TWICE?
  useEffect(() => {
    console.log("ran getNewTopic useEffect")
    getNewTopic()
  }, [])



  // CREATE IDEA
  const postNewIdea = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/idea/', {
        text: currentIdea,
        parentTopic: topic._id
      });
      console.log("postNewIdea response:", response.data)
      return response.data;
    } catch (error) {
      console.error('Error creating idea:', error);
      throw error;
    }
  };

  

  const postNewList = async () => {
    try {
      // Create the new list
      const newListResponse = await axios.post('http://localhost:3000/api/lists/', {
        topic: topic._id,
        ideas: ideaList,
        dateAdded: Date.now(),
        timeStarted: Date.now(),
      });
      setCurrentListId(newListResponse.data._id)
      console.log("post new list response data:", newListResponse.data);
  
      return newListResponse.data;
    } catch (error) {
      console.error('Error creating list and updating user:', error);
      throw error;
    }
  };

  
 

  // UPDATE LIST ON IDEAS 2 - 8
  const addIdeaToList = async () => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/lists/${currentListId}`, {
        ideas: ideaList,
      });
      console.log("Updated list after PATCH:", response)
      return response.data
      } catch (error) {
        console.error('Error updating list:', error);
        throw error;
      }
    };


  const finishList = async () => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/lists/${currentListId}`, {
        ideas: ideaList,
        status: 'public',
        timeCompleted: Date.now()
      });
      console.log("Finished list response object:", response)
      setPrivateList(false)
      return response.data
      } catch (error) {
        console.error('Error updating list:', error);
        throw error;
      }
    };


    const addListToUser = async () => {
      try {
        if (userData.userId) {
          // Fetch the user's current data first
          const getUserResponse = await axios.get(`http://localhost:3000/api/users/${userData.userId}`);
          const currentUserData = getUserResponse.data;
    
          // Create an updated lists array by pushing the new value
          const updatedLists = [...currentUserData.lists, currentListId];
    
          // Make the PATCH request with the updated lists array
          const response = await axios.patch(`http://localhost:3000/api/users/${userData.userId}`, {
            lists: updatedLists, // Use the updated lists array
          });
    
          console.log(response);
          return response.data;
        } else {
          console.log("User data not available yet.");
          return null; // Or some appropriate value indicating that the action was not performed
        }
      } catch (error) {
        console.error('Error updating user:', error);
        throw error;
      }
    };
    


  function handleLoggedOutClick(){
    setShowPopup(true)
  }

  function handlePopupClose(){
    setShowPopup(false)
  }

  function handleIncompleteListClick(){
    console.log("List not yeet complete...")
  }

  function handleToggleVisibility(){
    setPrivateList(!privateList);
  }


// Functions for idea management
  // handleAddIdeaAudio.currentTime = 0;
  // handleAddIdeaAudio.play();
  async function handleAddIdea() {
    setButtonActive(true);
    
    setTimeout(() => {
      setButtonActive(false);
    }, 100);
    
    if (currentIdea.trim().length < 3) return;
    if (ideaList.includes(currentIdea)) return;
  
    try {
      // SEND POST REQUEST TO CREATE IDEA
      const newIdea = await postNewIdea();
  
      // Update ideaList state
      setIdeaList(prevIdeas => {
        return [newIdea, ...prevIdeas];
      });
      // Set currentIdea and focus input before calling postNewListAPI
      setCurrentIdea("");
      ideaInputRef.current.focus();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    if (ideaList.length === 1) {
      postNewList();
    } else if (ideaList.length > 1 && ideaList.length < 9) {
      addIdeaToList();
    } else if (ideaList.length === 9) {
      finishList();
    }
  }, [ideaList]);


  // Improve implementation. This is a hacky workaround to deal with 
  // the currentListID value changing twice because of the component mounting twice.
  // I need to address the root issue of the component remounting.
  // This is preventing me from being able to use the useEffect
  useEffect(() => {
    if (currentListId.length > 1){
    console.log("currentListId has just been updated to:", currentListId)
    addListToUser()
  }
  }, [currentListId]);



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
  function updateIdea(index, updatedText) {
    setIdeaList((prevList) =>
      prevList.map((prevIdea, i) => {
        if (i === index) {
          return { ...prevIdea, text: updatedText }; // Update text property
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
            onClick={getNewTopic}
          />
          <div className='text-sm uppercase select-none'>topic</div>
      </div>

        { isLoggedIn && ideaList.length === 9 ? (
        <VisibilityToggle privateList={privateList} onToggleClick={handleToggleVisibility}/> 
        ) : (
        <div className='flex flex-row items-center w-[86px] justify-between'>
          <ToggleLeft 
            size={24} 
            className='cursor-pointer' 
            onClick={isLoggedIn ? handleIncompleteListClick : handleLoggedOutClick }/>
          <div className='text-sm uppercase select-none'>private</div>
        </div>
        )
        }
      </div>
      <div className='text-left mb-2 h-12'>
        {topic.name}{topic.name ? ':' : ''}
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

