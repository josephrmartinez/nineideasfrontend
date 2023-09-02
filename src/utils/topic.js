import axios from "axios";

export async function fetchNewTopic() {
    try {
        const response = await axios.get('http://localhost:3000/api/topic/new');
        return response.data;
    } catch (error) {
        console.error('Error fetching topic:', error);
        throw error;
    } 
    };

export async function createNewTopic(name) {
    try {
        const response = await axios.post('http://localhost:3000/api/user-topic', {name: name});
        return response.data;
    } catch (error) {
        console.error('Error creating new topic:', error);
        throw error;
    } 
    };