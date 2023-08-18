import axios from "axios";

export async function fetchNewTopic() {
    try {
        const response = await axios.get('http://localhost:3000/api/topic/new');
        return response.data;
    } catch (error) {
        console.error('Error fetching list:', error);
        throw error;
    } 
    };