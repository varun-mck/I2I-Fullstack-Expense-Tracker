// frontend/src/services/roleService.js

import axios from 'axios';

/**
 * Function to send API requests to the backend for assigning roles to users.
 * It uses axios to communicate with RoleController's assignRoleToUser endpoint.
 *
 * @param {number} userId - The ID of the user to whom the role will be assigned.
 * @param {string} roleName - The name of the role that will be assigned to the user.
 * @returns {Promise} - Axios promise with response or error.
 */
export const assignRoleToUser = async (userId, roleName) => {
    try {
        if (!userId || !roleName) {
            throw new Error("User ID and Role Name are required");
        }

        const response = await axios.post('/api/roles/assign', {
            userId: userId,
            roleName: roleName
        });

        return response.data;
    } catch (error) {
        console.error("Error assigning role to user:", error);
        throw error;
    }
};

export default {
    assignRoleToUser
};
