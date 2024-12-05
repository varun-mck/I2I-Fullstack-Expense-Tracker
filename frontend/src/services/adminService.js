/**
 * Admin Service
 * This service handles all admin related API calls.
 */

import axios from 'axios';

const BASE_URL = '/api/admin';

/**
 * Search users service function.
 * This function calls the backend API to search and fetch users based on the search term provided.
 * 
 * @param {string} searchTerm - The term to search users by.
 * @returns {Promise<Array>} - A promise that resolves to an array of users.
 */
export async function searchUsers(searchTerm) {
    try {
        const response = await axios.get(`${BASE_URL}/users/search`, {
            params: {
                q: searchTerm
            }
        });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Error fetching users');
        }
    } catch (error) {
        console.error('Error in searchUsers:', error);
        throw error;
    }
}

export default {
    searchUsers,
};
