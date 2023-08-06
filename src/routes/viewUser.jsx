import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authContext';
import axios from 'axios'; // Don't forget to import axios


export default function ViewUser(){
    const { userData } = useAuth()
    const [userProfile, setUserProfile] = useState({})


     // Function to make login API call
  const getUserProfile = (userData) => {
    // Make the GET request using axios
    axios
      .get(`http://localhost:3000/api/users/${userData.userId}`)
      .then((response) => {
        console.log(response.data)
        // set userProfile with returned data obj
        setUserProfile(response.data)
      })
      .catch((error) => {
        // Handle any errors that occur during the GET request
        console.error('Error:', error);
      });
  };
  

  // useEffect with an empty dependency array to run only once when the component mounts
  useEffect(() => {
    getUserProfile(userData); // Call the function to fetch user profile data
  }, []);


    return(
        <>
        <div className='text-left mt-6 w-10/12 max-w-md mx-auto space-y-2'>
            <div className='font-bold'>{userProfile.username}</div>
            <div className='text-sm'>{userProfile.bio}</div>
            <div className='text-sm font-light italic underline underline-offset-2 cursor-pointer'>update</div>
        </div>
        <div className='flex flex-row w-[22rem] my-16 justify-around mx-auto text-center'>
            <div className='flex flex-col w-16'>
                <div className='text-2xl font-bold'>8</div>
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
            <div className='mb-1 text-sm font-semibold uppercase text-neutral-500 tracking-wide'>completed lists</div>
        </div>
        

        </>
        
    )
}