import fetch from "node-fetch"
import { API_URL, API_URL_CALIFICACIONES } from "./index.js"
import { queryHistory, queryAsignatures, queryGrades } from "./queries.js";



/**
 * Provide a resolver function for each API endpoint (query)
 * @param query - The query to be executed in the API
 * @param route - The route to be executed in the API
 * @returns {Promise<json>} - The response from the API
 */
const refFetch = async (query, route) => {
    return fetch(route, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
        },
        body: JSON.stringify({
            query
        })
    })
        .then(response => response.json())
}


/**
 * Provide a resolver function for each API endpoint (query)
 * @type {{user: (function(*): Promise<unknown | DataTransferItem>)}}
 * @param {Object} args - The arguments passed in the query
 * @returns {Promise<unknown>} - The response from the API
 */
export const root = {
    user: (arg) => {
        // Use http://127.0.0.1:8000/user/<username> to get the user data via GET to request the user data
        return refFetch(queryHistory(arg), API_URL_CALIFICACIONES).then((response) => {
            const jsonHistory = response.data.listHistory

            return refFetch(queryAsignatures(arg), API_URL_CALIFICACIONES).then((response) => {
                const jsonAsignatures = response.data.listAsignatures

                return refFetch(queryGrades(arg), API_URL_CALIFICACIONES).then((response) => {
                    const jsonGrades = response.data.listGrades
                    const jsonFull = {
                        history: jsonHistory,
                        asignatures: jsonAsignatures,
                        grades: jsonGrades
                    }
                    console.log(jsonFull)

                    return refFetch(jsonFull, `${API_URL}/api/historiaAcademica/${arg.username}`).then((response) => {
                        return data
                    })
                })
            })
        })
    },
}
