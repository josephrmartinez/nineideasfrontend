import { useAuth } from '../contexts/authContext';



export default function ViewUser(){
    const { userData } = useAuth()




    return(
        <>
        <div className='font-bold text-sm'>{userData.username}</div>
        <div>{userData.userId}</div>
        </>
        
    )
}