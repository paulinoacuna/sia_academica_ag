import fetch from "node-fetch"
import { API_URL, API_URL_BUSCADOR_CURSOS, API_URL_INSCRIPCIONES } from "./index.js"


/**
 * Provide a resolver function for each API endpoint (query)
 * @type {{updateGrades: (function(*): Promise<unknown>), deleteGrades: (function(*): Promise<Response>), listAsignatures: ((function(*): (Promise<unknown>))|*), createGrades: (function(*): Promise<unknown>), listGrades: ((function(*): (Promise<unknown>))|*), updateAsignatures: (function(*): Promise<unknown>), updateHistory: (function(*): Promise<unknown>), listHistory: ((function(*): (Promise<unknown>))|*)}}
 * @param {Object} args - The arguments passed in the query
 * @returns {Promise<unknown>} - The response from the API
 * 
 **/
export const root = {
    listGrades: (arg) => {
        if (arg.id == null && arg.asignature === null) {
            return fetch(`${API_URL}/api/grades/`)
                .then(response => response.json())
                .then(data => {
                    return data
                })
        }
        else {
            let asignatura = arg.id !== null ? `?id=${arg.id}` : `?id_asignature=${arg.asignature}`
            return fetch(`${API_URL}/api/grades/${asignatura}`)
                .then(response => response.json())
                .then(data => {
                    return data
                })
        }
    },

    listAsignatures: (arg) => {
        if (arg.id == null && arg.termn === null) {
            return fetch(`${API_URL}/api/asignatures/`)
                .then(response => response.json())
                .then(data => {
                    
                    return data
                })
        }
        else {
            let termn = arg.id !== null ? `?id=${arg.id}` : `?term=${arg.termn}`

            return fetch(`${API_URL}/api/asignatures/${termn}`)
                .then(response => response.json())
                .then(data => {
                    return data
                })
        }
    },

    listHistory: (arg) => {
        if (arg.id == null && arg.termn === null) {
            return fetch(`${API_URL}/api/history/`)
                .then(response => response.json())
                .then(data => {
                    return data
                })
        }
        else {
            let program = arg.id !== null ? `?id=${arg.id}` : `?id_program=${arg.program}`

            return fetch(`${API_URL}/api/history/${program}`)
                .then(response => response.json())
                .then(data => {
                    return data
                })
        }
    },

    createGrades: (arg) => {
        let query = `
        {
            Tipologia(codigoAsignatura: ${arg.id_asignature}) {
                asignatura(codigo_asignatura: ${arg.id_asignature}){
                    codigo_asignatura
                }
            }
        }`
        return fetch(`${API_URL_BUSCADOR_CURSOS}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
            },
            body: JSON.stringify({
                query,
            })
        })
            .then(response => response.json())
            .then(data => {
                return fetch(`${API_URL_INSCRIPCIONES}/inscripcion/${arg.id_asignature}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => response.json())
                    .then(data => {
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
        
                                return data
                            })
                    })
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
                return data
            })
    },

    deleteGrades: (arg) => {
        return fetch(`${API_URL}/api/grades/${arg.input}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(data => {
                return data
            })
    },

    updateAsignatures: async (arg) => {
        return fetch(`${API_URL}/api/asignatures/update/${arg.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
            },
            body: JSON.stringify(arg)
        })
            .then(response => response.json())
            .then(data => {
                return data
            })
    },

    updateHistory: async (arg) => {
        return fetch(`${API_URL}/api/history/update/${arg.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
            },
            body: JSON.stringify(arg)
        })
            .then(response => response.json())
            .then(data => {
                return data
            })
    },
 
}
