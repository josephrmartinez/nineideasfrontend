import axios from "axios";
import apiEndpoint from "../config";
  
export async function getUserData(userId) {
    console.log("userId var passed to getUserData:", userId)
    try {
        const response = await axios.get(`${apiEndpoint}/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    } 
    };

 
    export async function updateUserBio(userId, updatedBio) {
        
        try {
            const response = await axios.patch(`${apiEndpoint}/users/${userId}`, updatedBio);
            console.log("Updated user obj:", response.data)
            return response.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        } 
        };
