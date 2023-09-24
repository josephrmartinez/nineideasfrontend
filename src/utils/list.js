import axios from "axios";
import apiEndpoint from "../config";

export async function getAllLists() {
    try {
        const response = await axios.get(`${apiEndpoint}/lists`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    } 
    };
  
export async function getOneList(listId) {
    try {
        const response = await axios.get(`${apiEndpoint}/lists/${listId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching list:', error);
        throw error;
    } 
    };

export async function deleteList(listId) {
    console.log("listId passed to deleteList function:", listId)
    try {
        const response = await axios.delete(`${apiEndpoint}/lists/${listId}`);
        return response
    } catch (error) {
        console.error('Error fetching list:', error);
        throw error;
    } 
    };

export async function toggleStatus(listId, publicList) {
    try {
        const response = await axios.patch(`${apiEndpoint}/lists/${listId}`, {
        public: publicList,
        });
        console.log("Updated list after PATCH:", response.data)
        return response.data
        } catch (error) {
          console.error('Error updating list:', error);
          throw error;
        }
      };

export async function updateList(listId, updates) {
    
    try {
        const response = await axios.patch(`${apiEndpoint}/lists/${listId}`, {
        updates
        });
        console.log("Updated list after PATCH:", response.data)
        return response.data
        } catch (error) {
            console.error('Error updating list:', error);
            throw error;
        }
        };

export async function contentModeration(ideaList) {
    try {
        const contentModerationResponse = await axios.post(`${apiEndpoint}/lists/check`, {
            ideaList: ideaList
          });
          return contentModerationResponse
    } catch (error) {
        console.error('Error with content moderation:', error);
        throw error;
    }
}

export async function postNewIdea(currentIdea, parentTopicId) {
    try {
      const response = await axios.post(`${apiEndpoint}/idea/`, {
        text: currentIdea,
        parentTopic: parentTopicId
      });
      console.log("postNewIdea response:", response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating idea:', error);
      throw error;
    }
  }

