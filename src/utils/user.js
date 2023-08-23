import axios from "axios";
  
export async function getUserData(userId) {
    console.log("userId var passed to getUserData:", userId)
    try {
        const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    } 
    };

 
    export async function updateUser(userId, updatedBio) {
        
        try {
            const response = await axios.patch(`http://localhost:3000/api/users/${userId}`, updatedBio);
            console.log("Updated user obj:", response.data)
            return response.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        } 
        };
