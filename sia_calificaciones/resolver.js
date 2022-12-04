import fetch from "node-fetch"
import routes from "../routes.js"
import { API_ROUTE, API_URL } from "./index.js"


/**
 * Provide a resolver function for each API endpoint (query)
 * @type {{updateUser: (function(*): Promise<unknown>), user: (function(*): Promise<DataTransferItem>)}}
 * @param {Object} args - The arguments passed in the query
 * @returns {Promise<unknown>} - The response from the API
 * 
 **/

const API_URL_INSCRIPCIONES = routes.inscripciones.route;
const API_URL_BUSCADOR_CURSOS = routes.buscadorMaterias.route;

export const root = {
    listAll: () => {
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
            let courses = arg.id !== null ? `?id=${arg.id}` : `?id_course=${arg.course}`
            return fetch(`${API_URL}/api/grades/${courses}`)
                .then(response => response.json())
                .then(data => {
                    
                    return data
                })
        }
    },
    

    listCourse: (arg) => {
        if (arg.termn == 'null'){
            arg.termn = null
        }
        if (arg.id == null && arg.termn == null) {
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
        
        if (arg == "null"){
            arg = null
        }
        
        if (arg == null && arg.program == null) {
            
            return fetch(`${API_URL}/api/history/`)
                .then(response => response.json())
                .then(data => {
                    return data
                })
        }
        else {
            
            let program = arg !== null ? `?id_student=${arg}` : `?id_program=${arg.program}`
      
        return fetch(`${API_URL}/api/history/${program}`)
            .then(response => response.json())
            .then(data => {
                return data
            })
        }
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
                return data
            })
    },

    updateHistory: async (arg) => {
        arg.asignature_taken = arg.asignature_taken
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


    getDocAsignatures: async (arg) => {
        
        let query = `{
            cursoByProfesor(documento_identidad: "${arg.documento_identidad}")
            {
                id_curso
                codigo_asignatura
                horarios {
                    documento_profesor
                }
            }
        }`
        var count = 0
        var arr = []; 

        return fetch(`${API_ROUTE}${API_URL_INSCRIPCIONES}`, {
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
                data.data.cursoByProfesor?.map((asig) => {
                    arr.push({ id_curso: asig.id_curso, documento_profesor: arg.documento_identidad, codigo_asignatura: asig.codigo_asignatura});
                    count++;
                });
                return arr;
            })
    },

    formatStudents: async (arg) => {
        if (arg.student == 'null'){
            arg.student = null
        }

        if (arg.student !== null) {
            return fetch(`${API_URL}/api/grades/`)
                .then(response => response.json())
                .then(data => {

                    let newdata = []
                    let course = {}
                    let count = 0

                    data.map((element) => {

                        let gradesdata = element['grades']
                        var dict = JSON.parse(gradesdata.replace(/'/g,'"'));

                        if (dict[arg.student] != null) {
    
                            if (!Object.keys(course).includes(element.id_course.toString())) {

                                course[element.id_course] = count

                                newdata.push({id: count, id_student: arg.student, id_course: element.id_course, name_asignature: '', grades: {}})
                                newdata[count]['grades'][element.name] = [element.percentage, dict[arg.student]]
                                count++
                            }
                            else {
                                newdata[course[element.id_course.toString()]]['grades'][element.name] = [element.percentage, dict[arg.student]]
                            }

                        }
                    })

                    newdata.map((element) => {
                        element['grades'] = JSON.stringify(element['grades'])
                    })
                    return newdata
                })
        }
        else {
            let courses = `?id_course=${arg.course}`
            return fetch(`${API_URL}/api/grades/${courses}`)
                .then(response => response.json())
                .then(data => {
                    let newdata = []
                    let users = {}
                    data.map((element) => {
                        let count = 0
                        let gradesdata = element['grades']
                        var dict = JSON.parse(gradesdata.replace(/'/g,'"'));
                        Object.keys(dict).map((grade) => {
                            if (!Object.keys(users).includes(grade)) {
                                users[grade] = count
                                newdata.push({id: count, id_student: grade, id_course: element.id_course, grades: {}})
                                newdata[count]['grades'][element.name] = [element.percentage, dict[grade]]
                                count ++
                            }
                            else {
                                newdata[users[grade]]['grades'][element.name] = [element.percentage, dict[grade]]
                            }
                            
                        })
                    })
                    newdata.map((element) => {
                        element['grades'] = JSON.stringify(element['grades'])
                    })
                    return newdata
                })
        }
    }

}