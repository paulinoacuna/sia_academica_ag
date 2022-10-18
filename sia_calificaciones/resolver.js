import { query, response } from "express"
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
    listAll: (arg) => {
        return fetch(`${API_URL}/api/all/`)
            .then(response => response.json())
            .then(data => {
                let jsonHistory = data["Histories"];
                let jsonCourses = data["Courses"];
                let jsonGrades = data["Grades"];

                const jsonFull = {
                    history: jsonHistory,
                    courses: jsonCourses,
                    grades: jsonGrades
                }
                return jsonFull
            })
    },

    listGrades: (arg) => {
        if (arg.id == null && arg.course == null) {
            return fetch(`${API_URL}/api/grades/`)
                .then(response => response.json())
                .then(data => {
                    return data
                })
        }
        else {
            let asignatura = arg.id !== null ? `?id=${arg.id}` : `?id_course=${arg.asignature}`
            return fetch(`${API_URL}/api/grades/${asignatura}`)
                .then(response => response.json())
                .then(data => {
                    
                    return data
                })
        }
    },
    

    listCourse: (arg) => {
        if (arg.id == null && arg.termn === null) {
            return fetch(`${API_URL}/api/courses/`)
                .then(response => response.json())
                .then(data => {
                    
                    return data
                })
        }
        else {
            let termn = arg.id !== null ? `?id=${arg.id}` : `?term=${arg.termn}`

            return fetch(`${API_URL}/api/courses/${termn}`)
                .then(response => response.json())
                .then(data => {
                    return data
                })
        }
    },

    listHistory: (arg) => {
        if (arg.id == null && arg.program === null) {
            return fetch(`${API_URL}/api/history/`)
                .then(response => response.json())
                .then(data => {
                    return data
                })
        }
        else {
            let program = arg.id !== null ? `?id=${arg.id}` : `?id_program=${arg.program}`

        return fetch(`${API_URL}/api/history/?id=${program}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                return data
            })
        }
    },

    createGrades: (arg) => {
        let gradesdata = arg.grades;
        var dict = JSON.parse(gradesdata.replace(/'/g,'"'));
        arg.grades = dict;
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
        let gradesdata = arg.grades;
        var dict = JSON.parse(gradesdata.replace(/'/g,'"'));
        arg.grades = dict;
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
            },
        })
            .then(data => {
                return data
            })
    },

    updateCourse: async (arg) => {
        return fetch(`${API_URL}/api/courses/update/${arg.id}`, {
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

    getCourseName: (arg) => {
        let query = `
        {
            asignatura(codigo_asignatura: ${arg.id_asignature}) {
                codigo_asignatura
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
                return data
            })
    },

    getStudents: (arg) => {
        let query = `inscripcionByIdCurso(id_curso: ${arg.id_course}){
            documento_estudiante
        }`

        return fetch(`${API_URL_INSCRIPCIONES}/inscripcion/${arg.id_course}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
            })
        })
            .then(response => response.json())
            .then(data => {
                return data
            })
    },

}
