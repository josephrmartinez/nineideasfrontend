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
  
export async function getOneList(listId) {
    try {
        const response = await axios.get(`http://localhost:3000/api/lists/${listId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching list:', error);
        throw error;
    } 
    };

export async function deleteList(listId) {
    try {
        const response = await axios.delete(`http://localhost:3000/api/lists/${listId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching list:', error);
        throw error;
    } 
    };

export async function toggleStatus(listId, visible) {
    try {
        const response = await axios.patch(`http://localhost:3000/api/lists/${listId}`, {
        visible: visible,
        });
        console.log("Updated list after PATCH:", response.data)
        return response.data
        } catch (error) {
          console.error('Error updating list:', error);
          throw error;
        }
      };