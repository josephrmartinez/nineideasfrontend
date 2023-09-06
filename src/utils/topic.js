import axios from "axios";
import apiEndpoint from "../config";

export async function fetchNewTopic() {
    try {
        const response = await axios.get(`${apiEndpoint}/topic/new`);
        return response.data;
    } catch (error) {
        console.error('Error fetching topic:', error);
        throw error;
    } 
    };

export async function createNewTopic(name, isPublic) {
    try {
        const response = await axios.post(`${apiEndpoint}/topic`, {name: name, public: isPublic});
        return response.data;
    } catch (error) {
        console.error('Error creating new topic:', error);
        throw error;
    } 
    };