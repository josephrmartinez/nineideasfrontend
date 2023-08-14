import axios from "axios";

export async function getAllLists() {
    try {
        const response = await axios.get('http://localhost:3000/api/lists');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    } 
    };
  