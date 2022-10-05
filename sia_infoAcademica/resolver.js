import fetch from "node-fetch"
import { API_URL } from "./index.js"


/**
 * Provide a resolver function for each API endpoint (query)
 * @type {{updateUser: (function(*): Promise<unknown>), user: (function(*): Promise<DataTransferItem>)}}
 * @param {Object} args - The arguments passed in the query
 * @returns {Promise<unknown>} - The response from the API
 */
export const root = {
    user: (arg) => {
        // Use http://127.0.0.1:8000/user/<username> to get the user data via GET to request the user data
        return fetch(`${API_URL}/historiaAcademica/${arg.username}`)
            .then(response => response.json())
            .then(data => {
                    return data
                }
            )
    },

}
