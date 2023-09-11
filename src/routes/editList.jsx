import { useEffect, useState, useRef } from 'react'
import '../App.css'
import VisibilityToggle from '../components/VisibilityToggle';
import PopupModal from '../components/PopupModal';
import { ArrowsClockwise, ToggleLeft, Trash } from "@phosphor-icons/react";
import axios from 'axios';
import { useAuth } from '../contexts/authContext';
import IdeasList from '../components/IdeasList';
import { getOneList, updateList } from '../utils/list';
import { useLoaderData, Form } from 'react-router-dom';
import apiEndpoint from '../config';

export async function loader({ params }) {
    const listData = await getOneList(params.listId);
    return { listData };
  }

export default function EditList(){
    const { listData } = useLoaderData();
    console.log("listData:", listData)

  const [topic, setTopic] = useState(listData.topic)
  const [currentIdea, setCurrentIdea] = useState("")
  const [ideaList, setIdeaList] = useState(listData.ideas)
  const [currentListId, setCurrentListId] = useState(listData._id)
  
  const [buttonActive, setButtonActive] = useState(false)
  const { isLoggedIn } = useAuth()
  const [showPopup, setShowPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState({})
  const [publicList, setPublicList] = useState(true)
  const ideaInputRef = useRef(null)
  const fillWidth = `${((ideaList.length) / 9) * 100}%`;



  // IDEA MANAGEMENT //

  // CREATE IDEA OBJ
  const postNewIdea = async () => {
    try {
      const response = await axios.post(`${apiEndpoint}/idea/`, {
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


  // ADD IDEA OBJ TO IDEASLIST
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
      const response = await axios.patch(`${apiEndpoint}/lists/${currentListId}`, {
        updates: {
        ideas: ideaList,
        completed: true,
        public: true,
        timeCompleted: Date.now()}
      });
      console.log("Finished list response data:", response.data)
      setPublicList(true)
      } catch (error) {
        console.error('Error updating list:', error);
        throw error;
      }
    };

    useEffect(() => {
        console.log("useEffect triggered")
        if (ideaList.length < 9) {
          addIdeaToList();
        } else if (ideaList.length === 9) {
          finishList();
        }
      }, [ideaList]);


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
      <p className='text-sm mb-4'>Or don't. You can use the site without creating an account. In this case, all of your lists are private and saved locally on your browser until you choose to clear browsing data.</p>
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
  }







  return (
    <div
        className='h-full flex flex-col items-center'>
      <div className='w-[22rem] mx-auto'>
      <div className='flex flex-row w-full justify-between items-center h-14'>
        <div className='flex flex-row items-center'>
            <DeleteList />
        </div>

        { isLoggedIn && ideaList.length === 9 ? (
        <VisibilityToggle publicList={publicList} onToggleClick={handleToggleVisibility}/> 
        ) : (
        <div className='flex flex-row items-center justify-between outline outline-1 outline-neutral-200 active:bg-neutral-100 shadow-sm rounded-full px-3 py-1 cursor-pointer text-neutral-600'
        onClick={isLoggedIn ? handleIncompleteListClick : handleLoggedOutClick }>
          
          <div className='text-sm uppercase select-none'>{ideaList.length === 0 ? 'private' : 'draft' }</div>
        </div>
        )
        }

      
        
      
      </div>
      <div className='text-left mb-2 h-12'>
        {topic.name}{topic.name ? ':' : ''}
      </div>

        
        
      <textarea
        className={`w-[22rem] mb-3 outline-none bg-neutral-50 ${ideaList.length >= 9 ? 'h-0 border-none transition-all duration-700' : 'h-20 border'}`}
        value={currentIdea}
        ref={ideaInputRef}
        autoFocus
        disabled={ideaList.length === 9}
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
      <div className='flex-grow overflow-y-scroll w-full border-t-2 mx-auto mt-8'>
        <div className='w-[22rem] mx-auto'>
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







  // TOPIC MANAGEMENT // 
//   const getNewTopic = async () => {
//     try {
//       setIsSpinning(true);
//       const newTopic = await fetchNewTopic()
//       await new Promise(resolve => setTimeout(resolve, 300)); // Delay for 300ms
//       setTopic(newTopic);
//       setIsSpinning(false);
//       setCurrentListId('');
//       setIdeaList([]);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };


  // CREATE LIST WITH FIRST IDEA
//   const postNewList = async () => {
//     try {
//       // Create the new list
//       const newListResponse = await axios.post('http://localhost:3000/api/lists/', {
//         topic: topic._id,
//         ideas: ideaList,
//         dateAdded: Date.now(),
//         timeStarted: Date.now(),
//       });
//       setCurrentListId(newListResponse.data._id)
//       console.log("post new list response data:", newListResponse.data);
  
//       return newListResponse.data;
//     } catch (error) {
//       console.error('Error creating list and updating user:', error);
//       throw error;
//     }
//   };

//   const addListToUser = async () => {
//     try {
//       if (userData._id) {
//         // Fetch the user's current data first
//         const getUserResponse = await axios.get(`http://localhost:3000/api/users/${userData._id}`);
//         const currentUserData = getUserResponse.data;
  
//         // Create an updated lists array by pushing the new value
//         const updatedLists = [...currentUserData.lists, currentListId];
  
//         // Make the PATCH request with the updated lists array
//         const response = await axios.patch(`http://localhost:3000/api/users/${userData._id}`, {
//           lists: updatedLists, // Use the updated lists array
//         });
  
//         console.log(response);
//         return response.data;
//       } else {
//         console.log("User data not available yet.");
//         return null; // Or some appropriate value indicating that the action was not performed
//       }
//     } catch (error) {
//       console.error('Error updating user:', error);
//       throw error;
//     }
//   };
  

  // Is there a better way to implement this logic?
  // There is a bug here where a new list is generated if the user makes an edit to their first idea.
  // Likewise, the finishList function is called every time a user makes updates to an idea in a completed list
//   useEffect(() => {
//     console.log("Calling the useEffect")
//     if (ideaList.length === 1) {
//       postNewList();
//     } else if (ideaList.length > 1 && ideaList.length < 9) {
//       addIdeaToList();
//     } else if (ideaList.length === 9) {
//       finishList();
//     }
//   }, [ideaList]);


  // Improve implementation. This is a hacky workaround to deal with 
  // the currentListID value changing twice because of the component mounting twice.
  // I need to address the root issue of the component remounting.
  // This is preventing me from being able to use the useEffect
//   useEffect(() => {
//     if (currentListId.length > 1){
//     console.log("currentListId has just been updated to:", currentListId)
//     addListToUser()
//   }
//   }, [currentListId]);

// USE ACTION TO MAKE LIST UPDATES?
// export async function action({ request, params }) {
//     const formData = await request.formData();
//     const updates = Object.fromEntries(formData);
    

//     console.log("updates:", updates)

//     await updateList(params.listId, updates);
    // return redirect(`/user/${params.userId}`);
//   }
