import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authContext';
import axios from 'axios'; 
import { HandsClapping, Chat } from "@phosphor-icons/react";



export default function ViewUser(){
    const { userData } = useAuth()
    const [userProfile, setUserProfile] = useState({})

    const getUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${userData.userId}`);
        console.log("getUserProfile response:", response.data)
        setUserProfile(response.data);
      } catch (error) {
        // Handle any errors that occur during the GET request
        console.error('Error:', error);
      }
    };
  

  // useEffect with an empty dependency array to run only once when the component mounts
  useEffect(() => {
    console.log("Ran useEffect in viewUser file to getUserProfile")
    getUserProfile(); // Call the function to fetch user profile data
  }, []);



  // DEVELOP STYLING FURTHER
  const completedLists = userProfile.lists?.map((list, index) => {
    return (
      <div key={index} className='my-6'>
      <div
        className="text-left text-sm font-semibold tracking-wide text-gray-600"
        key={index}
      >
        {list.topic.name}
      </div>

      <div className='text-xs uppercase text-left'>{list.status}</div>
      </div>
      )
    })


    return(
        <>
        <div className='text-left mt-6 w-10/12 max-w-md mx-auto space-y-2'>
            <div className='font-bold'>{userProfile.username}</div>
            <div className='text-sm'>{userProfile.bio}</div>
            <div className='text-sm font-light italic underline underline-offset-2 cursor-pointer'>update</div>
        </div>
        <div className='flex flex-row w-[22rem] my-16 justify-around mx-auto text-center'>
            <div className='flex flex-col w-16'>
                <div className='text-2xl font-bold'>{userProfile.lists ? userProfile.lists.length : 0}</div>
                <div className='text-sm uppercase text-neutral-600'>total lists</div>
            </div>
            <div className='flex flex-col w-16'>
                <div className='text-2xl font-bold'>3</div>
                <div className='text-sm uppercase text-neutral-600'>current streak</div>
            </div>
            <div className='flex flex-col w-16'>
                <div className='text-2xl font-bold'>3</div>
                <div className='text-sm uppercase text-neutral-600'>record streak</div>
            </div>
            
        </div>
        
        <div className='w-full border-b-2'>
            <div className='mb-1 text-sm font-semibold uppercase text-neutral-500 tracking-wide'>lists</div>
        </div>
        <div className='w-full'>
          <div className='w-80 mx-auto'>{completedLists}</div>
        </div>
        

        </>
        
    )
}