import { useEffect, useState, useRef } from 'react'
import '../App.css'
import VisibilityToggle from '../components/VisibilityToggle';
import PopupModal from '../components/PopupModal';
import { ArrowsClockwise } from "@phosphor-icons/react";
import axios from 'axios';
import { useAuth } from '../contexts/authContext';
import IdeasList from '../components/IdeasList';
import { fetchNewTopic, createNewTopic } from '../utils/topic';
import { useLocation } from 'react-router-dom';
import apiEndpoint from '../config';
import { contentModeration, postNewIdea } from '../utils/list';
import ShareList from "../components/ShareList";


export default function AddList(){
  const location = useLocation();

  const [topic, setTopic] = useState(location.state?.topic || {})
  const [currentIdea, setCurrentIdea] = useState("")
  const [ideaList, setIdeaList] = useState([])
  const [listData, setListData] = useState({})
  const [currentListId, setCurrentListId] = useState("")
  const [topicActive, setTopicActive] = useState(false)
  const [buttonActive, setButtonActive] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false);
  const { isLoggedIn, userAuthData } = useAuth()
  const [showPopup, setShowPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState({})
  const [publicList, setPublicList] = useState(true)
  const ideaInputRef = useRef(null)
  const topicInputRef = useRef(null)
  const fillWidth = `${((ideaList.length) / 9) * 100}%`;

  useEffect(() => {
    if (userAuthData !== null) {
      console.log("userData loaded from addList useEffect:", userAuthData);
      // Now that userData is available, you can use it for further logic or updates.
    }
  }, [userAuthData]);



  // TOPIC MANAGEMENT // 

  // Run on component mount (occurs twice in StrictMode)
  // UPDATE THIS SO THAT PASSED IN DATA IS NOT OVERWRITTEN
  useEffect(() => {
    if (location.state?.topic == null){
      getNewTopic();
    }
  }, []);

  // useEffect(() => {
  //   console.log("Topic:", topic)
  // }, [topic]);

  useEffect(() => {
    console.log("listData:", listData)
  }, [listData]);

  const getNewTopic = async () => {
    try {
      setIsSpinning(true);
      const [newTopic] = await Promise.all([
        fetchNewTopic(),
        new Promise(resolve => setTimeout(resolve, 300))
      ]);
      setTopic(newTopic);
      setIsSpinning(false);
      setCurrentListId('');
      setIdeaList([]);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  // ADD IDEA OBJ TO IDEASLIST
  async function handleAddIdea() {
    if (isSubmitting) {
      return
    }
    
    setTimeout(() => {
      setButtonActive(false);
    }, 150);

    if (currentIdea.trim().length < 3) return;
    if (ideaList.some(idea => idea.text === currentIdea)) return;

    setButtonActive(true);
    setIsSubmitting(true)

  try {
    const optimisticIdea = createOptimisticIdea();
    updateUIWithOptimisticIdea(optimisticIdea);

    await performAPIRequest(optimisticIdea);

    
  } catch (error) {
    console.error("Error:", error);
  } finally{
    setIsSubmitting(false);
  }
}

function createOptimisticIdea() {
  return {
    text: currentIdea,
    parentTopic: topic._id,
    isOptimistic: true
  };
}

function updateUIWithOptimisticIdea(optimisticIdea) {
  setIdeaList((prevIdeas) => [optimisticIdea, ...prevIdeas]);
  setCurrentIdea("");
  ideaInputRef.current.focus();
}

async function performAPIRequest(optimisticIdea) {
  if (isLoggedIn) {
    // console.log("performingAPIRequest")
    // console.log("ideaList", ideaList)
    try {
      const newIdea = await postNewIdea(optimisticIdea.text, topic._id);
      // console.log("newIdea", newIdea);

      setIdeaList((prevIdeas) =>
        prevIdeas.map((idea) =>
          idea.isOptimistic ? newIdea : idea
        )
      );
    } catch (error) {
      console.log("Error while creating idea:", error);
    }
  } else return
}


  // Update already posted idea
  // CURRENTLY, THIS FUNCTION TRIGGERS THE USEEFFECT BECAUSE THE LOCAL IDEALIST IS BEING UPDATED.
  function updateIdea(index, updatedText) {

    // console.log("running updateIdea")
    // Update ideaList on db
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

  function handleIdeaInputChange(event) {
    setCurrentIdea(event.target.value)
  }

  function checkForSubmit(event) {
    if (currentIdea.trim().length < 3) return;
    if (event.key === 'Enter' && !isSubmitting) {
      event.preventDefault();
      handleAddIdea()
    }
  }



  // LIST MANAGEMENT //

  // CREATE LIST WITH FIRST IDEA
  const postNewList = async () => {
    if (!isLoggedIn) return;
    try {

      const timeStarted = new Date()

      // Create the new list
      const newListResponse = await axios.post(`${apiEndpoint}/lists/`, {
        topic: topic._id,
        ideas: ideaList,
        timeStarted: timeStarted,
        author: userAuthData?.userId || 'loggedOutUser'
      });
      setCurrentListId(newListResponse.data._id)
      setListData({
        _id: newListResponse.data._id,
        topic: topic,
       })
      // console.log("post new list response data:", newListResponse.data);
  
      return newListResponse.data;
    } catch (error) {
      console.error('Error creating list and updating user:', error);
      throw error;
    }
  };

  // UPDATE LIST ON IDEAS 2 - 8
  const addIdeaToList = async () => {
    if (!isLoggedIn) return;
    // console.log("Calling addIdeaToList")
    // console.log("ideaList:", ideaList)
    try {
      const response = await axios.patch(`${apiEndpoint}/lists/${currentListId}`, {
        updates: {
          ideas: ideaList
        }
      });
      
      // console.log("Updated list after PATCH:", response.data)
      return response.data
      } catch (error) {
        console.error('Error updating list:', error);
        throw error;
      }
    };

  // ADD 9TH IDEA TO FINISH LIST
  const finishList = async () => {
    // console.log(`calling finishList ${new Date()}`)
    try {
      const startTime = Date.now();

      const response = await contentModeration(ideaList);

      const isContentReadable = response.data
      // console.log("content moderation result:", isContentReadable)

      const endTime = Date.now();
      const elapsedTime = endTime - startTime;
      // console.log("Time required for content moderation (ms):", elapsedTime);
      
      if (isContentReadable) {
        if (!isLoggedIn) return;
        try {

          // Create a new Date object on the frontend
          const dateCompletedObject = new Date().toLocaleDateString();

          // If content is safe and user is logged in, update the list
          const response = await axios.patch(`${apiEndpoint}/lists/${currentListId}`, {
            updates: {
              ideas: ideaList,
              completed: true,
              public: true,
              timeCompleted: new Date(),
              dateCompleted: dateCompletedObject
            }
          });
          // console.log("Finished list response object:", response.data);
          
          setPublicList(true);
          return response.data;
        } catch (error) {
          console.error('Error updating list:', error);
          throw error;
        }


      } else {
        setIdeaList(prevIdeas => {
          // Create a copy of the existing ideas array without the first element
          const updatedIdeas = prevIdeas.slice(1);
          
          return updatedIdeas;
        });

        setTimeout(() => {
          setPopupMessage(
            <>
            <p className="font-semibold text-md mb-1">Content Moderation Alert</p>
            <p className='text-sm mb-4'>This list does not pass the content moderation check. This is probably because you typed in unreadable content such as "adflkjhasflgkj"</p>
            <p className='text-sm mb-4'>Please complete your list with real, complete ideas.</p>
            <p className='text-sm'>View <a href='/content-moderation' className='underline text-blue-700'>content moderation policy</a>.</p>
            </>
          )
          setShowPopup(true)
        }, 800);
      }
    } catch (error) {
      console.error('Error with content moderation:', error);
      throw error;
    }
  };
  


    

  const addListToUser = async () => {
    try {
      if (userAuthData.userId) {
        // Fetch the user's current data first
        const getUserResponse = await axios.get(`${apiEndpoint}/users/${userAuthData.userId}`);
        const currentUserData = getUserResponse.data;
  
        // Create an updated lists array by pushing the new value
        const updatedLists = [...currentUserData.lists, currentListId];
  
        // Make the PATCH request with the updated lists array
        const response = await axios.patch(`${apiEndpoint}/users/${userAuthData.userId}`, {
          lists: updatedLists, // Use the updated lists array
        });
  
        // console.log("Added list to user:", response.data);
        return response.data;
      } else {
        // console.log("User data not available yet.");
        return null; // Or some appropriate value indicating that the action was not performed
      }
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };
  
// DEBUG
// Currently, the optimistic UI is generating a bug: the useEffect is firing with the optimisticIdea object, but this does not pass validation and leads to a server error
  // Is there a better way to implement this logic?
  // There is a bug here where a new list is generated if the user makes an edit to their first idea.
  // Likewise, the finishList function is called every time a user makes updates to an idea in a completed list
  useEffect(() => {
    const hasOptimisticIdeas = ideaList.some((idea) => idea.isOptimistic);

    if (!hasOptimisticIdeas) {
      if (ideaList.length === 1) {
        postNewList();
      } else if (ideaList.length > 1 && ideaList.length < 9) {
        addIdeaToList();
      } else if (ideaList.length === 9) {
        finishList();
      }
  }
  
  }, [ideaList]);

  
  useEffect(() => {
    if (!isLoggedIn) {
      if (ideaList.length === 9) {
        finishList();
      }
  }
  }, [ideaList]);


  // Improve implementation. This is a hacky workaround to deal with 
  // the currentListID value changing twice because of the component mounting twice.
  // I need to address the root issue of the component remounting.
  // This is preventing me from being able to use the useEffect
  useEffect(() => {
    if (currentListId.length > 1){
    // console.log("currentListId has just been updated to:", currentListId)
    addListToUser()
  }
  }, [currentListId]);



  // TOGGLE AND POPUP MANAGEMENT //

  // POPUP HANDLER FUNCTION
  function handleLoggedOutClick(){
    setPopupMessage(
      <>
      <p className="font-semibold text-md mb-1">Log in or sign up to:</p>
      <ul className='text-sm mb-4 ml-4 list-disc'>
        <li>Publish public lists</li>
        <li>Comment on and like public lists</li>
        <li>Securely save your lists</li>
      </ul>
      <p className='text-sm mb-4'>No email address required to create an account. You can still use the site without creating an account but your lists will not be saved.</p>
      <p className='text-sm'>Make generating ideas a daily habit.</p>
      </>
    )
    setShowPopup(true)
  }

  // POPUP HANDLER FUNCTION
  function handlePopupClose(){
    setShowPopup(false)
  }
  
  // POPUP HANDLER FUNCTION
  function handleIncompleteListClick(){
    setPopupMessage(
      <>
      <p className="font-semibold text-md mb-1">This list is not yet complete.</p>
      <p className='text-sm mb-4'>Lists are saved as private drafts until they are completed with nine ideas.</p>
      <p className='text-sm mb-4'>Once an idea list is complete, you can decide whether to share it publicly or to keep it private.</p>
      <p className='text-sm'>Make generating ideas a daily habit.</p>
      </>
    )
    setShowPopup(true)
  }


  function handleToggleVisibility(){
    setPublicList(!publicList);
    // console.log("Calling handleToggleVisibility")
    };


  useEffect(() => {
    if (ideaList.length === 9){
      async function updateListVisibility(){
      try {
        const response = await axios.patch(`${apiEndpoint}/lists/${currentListId}`, {
          updates: {
            public: publicList
          }
      });
      // console.log("Updated list after PATCH:", response.data)
      
      } catch (error) {
        console.error('Error updating list:', error);
        throw error;
      }
      }
      updateListVisibility();
    }
  }, [publicList]);



  async function createTopic(){
    if (!topic._id && topic.name.trim()){
      const newTopic = await createNewTopic(topic.name, false)
      setTopic(newTopic)
      // console.log("newTopic:", newTopic)
    }
  }

  async function toggleTopicActive() {
    if (topicActive && topic.name.trim()) {
      setTopicActive(false)
      ideaInputRef.current.focus()
      createTopic()
    } else {
      setTopicActive(true)
    }
  }

  function handleTopicInputChange(event) {
    setTopic({_id: '', name: event.target.value})
  }

  function checkForSubmitTopic(event) {
    if (event.key === 'Enter' && topicActive && topic.name.trim()) {
      event.preventDefault();
      setTopicActive(false)
      // Running this focus event will subsequently trigger the onBlur function (toggleTopicActive)
      ideaInputRef.current.focus()
      }
    }

  








  return (
    // h-full is causing the progress bar parent container to resize. Troubleshoot
    <div className='h-full flex flex-col items-center content-center  mx-auto'>
      <div className='w-10/12 max-w-md'>
      <div className='flex flex-row w-full justify-between items-center h-14'>
        <div className='flex flex-row items-center text-neutral-600 outline outline-1 outline-neutral-200 active:bg-neutral-100 shadow-sm rounded-full px-3 py-1 cursor-pointer'
        onClick={getNewTopic}>
          <ArrowsClockwise
            size={22}
            className={`cursor-pointer mr-2 ${isSpinning ? 'animate-spin' : ''}`}
            
          />
          <div className='text-sm uppercase select-none'>topic</div>
        </div>

        <div className="flex flex-row items-center">
        { isLoggedIn && ideaList.length === 9 ? (
        <>
        {publicList && <ShareList listData={listData}/>}
        <VisibilityToggle publicList={publicList} onToggleClick={handleToggleVisibility}/> 
        </>
        ) : (
        <div className='flex flex-row items-center justify-between outline outline-1 outline-neutral-200 active:bg-neutral-100 shadow-sm rounded-full px-3 py-1 cursor-pointer text-neutral-600'
        onClick={isLoggedIn ? handleIncompleteListClick : handleLoggedOutClick }>
          
          <div className='text-sm uppercase select-none'>{ideaList.length === 0 ? 'private' : 'draft' }</div>
        </div>
        )
        }
        </div>
      </div>

      {topicActive ?
        <textarea
        className='text-left mb-2 w-full h-12'
          value={topic.name}
          maxLength={90}
          ref={topicInputRef}
          autoFocus
          onBlur={toggleTopicActive}
          onChange={handleTopicInputChange}
          onKeyDown={checkForSubmitTopic}></textarea>
        : <div
        className='text-left mb-3.5 h-12'
        onClick={()=>setTopicActive(true)}>
          
        {topic.name}{topic.name ? ':' : ''}
      </div>
      }


        
      <textarea
        className={`w-full mb-2 outline-none bg-neutral-50 ${ideaList.length >= 9 ? 'h-0 border-none transition-all duration-700' : 'h-20 border'}`}
        value={currentIdea}
        ref={ideaInputRef}
        autoFocus
        disabled={ideaList.length === 9}
        onChange={handleIdeaInputChange}
        onKeyDown={checkForSubmit}
      >
      </textarea> 
      
      <div className='w-full h-2.5 mb-4 mx-auto rounded-full border relative'>  
        <div className='absolute left-0 top-0 h-2 rounded-full shadow-lg'
          style={{ width: fillWidth, background: "linear-gradient(to bottom, #6cb00e, #005c14)", transition: "width 0.4s cubic-bezier(0.3, .15, 0.35, 1)" }}>
        </div>
      </div>

      <div className='w-full mx-auto'>
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

      </div>

      
      
      {ideaList.length > 0 && 
      <div className='flex-grow overflow-y-scroll w-full border-t-2 mx-auto mt-6'>
        <div className='w-full mx-auto'>
          <IdeasList ideaList={ideaList} updateIdea={updateIdea} />
        </div>
      </div>
      }
      
      {showPopup && <PopupModal popupMessage={popupMessage} onClose={handlePopupClose}/>}

    </div>
    
  )
}

