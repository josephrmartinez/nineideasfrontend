import { useEffect, useState, useRef } from 'react'
import '../App.css'
import VisibilityToggle from '../components/VisibilityToggle';
import PopupModal from '../components/PopupModal';
import { Trash } from "@phosphor-icons/react";
import axios from 'axios';
import { useAuth } from '../contexts/authContext';
import IdeasList from '../components/IdeasList';
import { getOneList, updateList, postNewIdea, contentModeration } from '../utils/list';
import { useLoaderData, Form } from 'react-router-dom';
import apiEndpoint from '../config';
import ShareList from "../components/ShareList";


export async function loader({ params }) {
    const listData = await getOneList(params.listId);
    return { listData };
  }

export default function EditList(){
    const { listData } = useLoaderData();

  const [topic, setTopic] = useState(listData.topic)
  const [currentIdea, setCurrentIdea] = useState("")
  const [ideaList, setIdeaList] = useState(listData.ideas)
  const [currentListId, setCurrentListId] = useState(listData._id)
  
  const [buttonActive, setButtonActive] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { isLoggedIn } = useAuth()
  const [showPopup, setShowPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState({})
  const [publicList, setPublicList] = useState(true)
  const ideaInputRef = useRef(null)
  const fillWidth = `${((ideaList.length) / 9) * 100}%`;



  // IDEA MANAGEMENT //
  // // CREATE IDEA OBJ
  // const postNewIdea = async () => {
  //   try {
  //     const response = await axios.post(`${apiEndpoint}/idea/`, {
  //       text: currentIdea,
  //       parentTopic: topic._id
  //     });
  //     console.log("postNewIdea response:", response.data)
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error creating idea:', error);
  //     throw error;
  //   }
  // };


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
    console.log("performingAPIRequest")
    console.log("ideaList", ideaList)
    try {
      const newIdea = await postNewIdea(optimisticIdea.text, topic._id);
      console.log("newIdea", newIdea);

      setIdeaList((prevIdeas) =>
        prevIdeas.map((idea) =>
          idea.isOptimistic ? newIdea : idea
        )
      );
      
    } catch (error) {
      console.log("Error while creating idea:", error);
    }
  }
}




  async function updateIdeaTextOnServer(ideaId, updatedText) {
    try {
    const response = await axios.patch(`${apiEndpoint}/idea/${ideaId}`, {
      updates: {
          text: updatedText,
    }});
    console.log("Updated idea after PATCH:", response.data)
    } catch (error) {
      console.error('Error updating list:', error);
      throw error;
    }
  }

  // Update already posted idea
  // WHY IS THIS NOT TRIGGERING THE USEEFFECT?
  function updateIdea(index, updatedText) {
    setIdeaList((prevList) =>
      prevList.map((prevIdea, i) => {
        if (i === index) {
            updateIdeaTextOnServer(prevIdea._id, updatedText)
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
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddIdea()
    }
  }



  // LIST MANAGEMENT //


  // UPDATE LIST ON IDEAS 2 - 8
  const addIdeaToList = async () => {
    console.log("Calling addIdeaToList with this ideaList:", ideaList)
    try {
        const updatedIdeas = [...ideaList]
      const response = await axios.patch(`${apiEndpoint}/lists/${currentListId}`, {
        updates: {
            ideas: updatedIdeas,
      }});
      console.log("Updated list after PATCH:", response.data)
      return response.data
      } catch (error) {
        console.error('Error updating list:', error);
        throw error;
      }
    };

  // ADD 9TH IDEA TO FINISH LIST
  const finishList = async () => {
    try {
      const startTime = Date.now();

      const response = await contentModeration(ideaList);

      const isContentReadable = response.data
      console.log("content moderation result:", isContentReadable)

      const endTime = Date.now();
      const elapsedTime = endTime - startTime;
      console.log("Time required for content moderation (ms):", elapsedTime);
      
      if (isContentReadable) {
        

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
          console.log("Finished list response object:", response.data);
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
            <p className='text-sm'>Please complete your list with real, complete ideas.</p>
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



  useEffect(() => {
    const hasOptimisticIdeas = ideaList.some((idea) => idea.isOptimistic);

    if (!hasOptimisticIdeas) {
      if (ideaList.length > 1 && ideaList.length < 9) {
        addIdeaToList();
      } else if (ideaList.length === 9) {
        finishList();
      }
  }
  
  }, [ideaList]);

  // TOGGLE AND POPUP MANAGEMENT //

  // POPUP HANDLER FUNCTION
  // function handleLoggedOutClick(){
  //   setPopupMessage(
  //     <>
  //     <p className="font-semibold text-md mb-1">Log in or sign up to:</p>
  //     <ul className='text-sm mb-4 ml-4 list-disc'>
  //       <li>Publish public lists</li>
  //       <li>Comment on and like public lists</li>
  //       <li>Securely save your lists</li>
  //     </ul>
  //     <p className='text-sm mb-4'>Or don't. You can use the site without creating an account. In this case, all of your lists are private and saved locally on your browser until you choose to clear browsing data.</p>
  //     <p className='text-sm'>Make generating ideas a daily habit.</p>
  //     </>
  //   )
  //   setShowPopup(true)
  // }

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
  }

  useEffect(() => {
    if (ideaList.length === 9){
      async function updateListVisibility(){
      try {
        const response = await axios.patch(`${apiEndpoint}/lists/${currentListId}`, {
          updates: {
            public: publicList
          }
      });
      console.log("Updated list after PATCH:", response.data)
      
      } catch (error) {
        console.error('Error updating list:', error);
        throw error;
      }
      }
      updateListVisibility();
    }
  }, [publicList]);






  return (
    <div className='h-full flex flex-col items-center content-center  mx-auto'>
      <div className='w-10/12 max-w-md'>
      <div className='flex flex-row w-full justify-between items-center h-14'>
        <DeleteList />

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

      <div className='text-left mb-3.5 h-12'>
        {topic.name}{topic.name ? ':' : ''}
      </div>

        
        
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

const DeleteList = () => {
    return (
        <Form
            method="post"
            action="delete"
            className='flex flex-row items-center'
            onSubmit={(event) => {
            if (
                !confirm(
                "Please confirm you want to delete this record."
                )
            ) {
                event.preventDefault();
            }
            }}
        >
            <button type="submit"><Trash size={22} weight={'thin'} className="cursor-pointer"/></button>
        </Form>
    )
}