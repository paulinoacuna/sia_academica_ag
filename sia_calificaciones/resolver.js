import fetch from "node-fetch"
import { API_URL } from "./index.js"


/**
 * Provide a resolver function for each API endpoint (query)
 * @type {{updateUser: (function(*): Promise<unknown>), user: (function(*): Promise<DataTransferItem>)}}
 * @param {Object} args - The arguments passed in the query
 * @returns {Promise<unknown>} - The response from the API
 * 
 **/

export const root = {
    listGrades: (arg) => {
        let asignatura = arg.id !== null ? `?id=${arg.id}` : `?id_asignature=${arg.asignature}`

        return fetch(`${API_URL}/api/grades/${asignatura}`)
            .then(response => response.json())
            .then(data => {
                return data
            })
    },
    

    listAsignatures: (arg) => {
        let termn = arg.id !== null ? `?id=${arg.id}` : `?id_term=${arg.termn}`
        
        return fetch(`${API_URL}/api/asignatures/?id=${termn}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                return data
            })
    },

    listHistory: (arg) => {
        let program = arg.id !== null ? `?id=${arg.id}` : `?id_program=${arg.program}`

        return fetch(`${API_URL}/api/history/?id=${program}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                return data
            })
    },

    createGrades: (arg) => {
        return fetch(`${API_URL}/api/grades/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
            },
            body: JSON.stringify(arg)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                return data
            })
    },

    updateGrades: async (arg) => {
        return fetch(`${API_URL}/api/grades/update/${arg.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
            },
            body: JSON.stringify(arg)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                return data
            })
        
    },

    deleteGrades: (arg) => {
        return fetch(`${API_URL}/api/grades/delete/${arg.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
            },
            body: JSON.stringify(arg)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                return data
            })
        
    }
 
}
