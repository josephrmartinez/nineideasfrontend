import axios from "axios";
  
export async function getUserData(userId) {
    try {
        const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching list:', error);
        throw error;
    } 
    };