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
     
        if (arg.id_student == 'null'){
            arg.id_student = null
        }
        
        if (arg.id_student == null && arg.program == null) {
            return fetch(`${API_URL}/api/history/`)
                .then(response => response.json())
                .then(data => {
                    return data
                })
        }
        else {
            let program = arg.id_student !== null ? `?id_student=${arg.id}` : `?id_program=${arg.program}`

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
        let response = await fetch(`${API_ROUTE}${API_URL_INSCRIPCIONES}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
            })
        })
        
        let datas = await response.json()
        await datas.data.cursoByProfesor?.map((asig) => {
            arr.push({ id_curso: asig.id_curso, documento_profesor: arg.documento_identidad, codigo_asignatura: asig.codigo_asignatura, nameCourse: 'h' });
            let data = getName(asig.codigo_asignatura)
            arr[count]['nameCourse'] = data
            count++;
        });


        return arr;
    },

    formatStudents: async (arg) => {
        if (arg.student == 'null'){
            arg.student = null
        }
        if (arg.student !== null) {
            const response = await fetch(`${API_URL}/api/grades/`);
            const data = await response.json();
            let newdata = [];
            let course = {};
            let count = 0;
            await data?.map((element) => {

                let gradesdata = element['grades'];
                var dict = JSON.parse(gradesdata.replace(/'/g, '"'));

                if (dict[arg.student] != null) {
                    //console.log(element.id_course)
                    if (!Object.keys(course).includes(element.id_course.toString())) {

                        course[element.id_course] = count;

                        newdata.push({ id: count, id_student: arg.student, id_course: element.id_course, name_asignature: 'h', grades: {} });

                        let name = getNameFormat(element.id_course)
      
                        newdata[count]['name_asignature'] = name
                        newdata[count]['grades'][element.name] = [element.percentage, dict[arg.student]];
                        count++;
                    }
                    else {
                        newdata[course[element.id_course.toString()]]['grades'][element.name] = [element.percentage, dict[arg.student]];
                    }

                }
            });
            newdata?.map((element_1) => {
                element_1['grades'] = JSON.stringify(element_1['grades']);
            });
            return newdata;
        }
        else {
            let courses = `?id_course=${arg.course}`
            const response_1 = await fetch(`${API_URL}/api/grades/${courses}`);
            const data_1 = await response_1.json();
            let newdata_1 = [];
            let users = {};

            let name = getNameFormat(arg.course)
            data_1?.map((element_2) => {
                let count_1 = 0;
                let gradesdata_1 = element_2['grades'];
                var dict_1 = JSON.parse(gradesdata_1.replace(/'/g, '"'));
                Object.keys(dict_1).map((grade) => {
                    if (!Object.keys(users).includes(grade)) {
                        users[grade] = count_1;
                        newdata_1.push({ id: count_1, id_student: grade, id_course: element_2.id_course, name_asignature: name, grades: {} });
                        newdata_1[count_1]['grades'][element_2.name] = [element_2.percentage, dict_1[grade]];
                        count_1++;
                    }
                    else {
                        newdata_1[users[grade]]['grades'][element_2.name] = [element_2.percentage, dict_1[grade]];
                    }

                });
            });
            newdata_1?.map((element_3) => {
                element_3['grades'] = JSON.stringify(element_3['grades']);
            });
            return newdata_1;
        }
    }

}

async function getName(codigo) {
    let query = `
    {
        asignatura(codigo_asignatura: ${codigo}) {
            nombre_asignatura
        }
    }`
    
    let nomCu = ''
    let response = await fetch(`${API_ROUTE}${API_URL_BUSCADOR_CURSOS}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
        },
        body: JSON.stringify({
            query,
        })
    })

    let data = await response.json()
    
    nomCu = await data.data.asignatura.nombre_asignatura

    return nomCu
}

async function getNameFormat(codigo_curso) {
    let termn = `?id=${codigo_curso}`
    let response0 = await fetch(`${API_URL}/api/courses/${termn}`)

    let data0 = await response0.json()
    
    
    let codigo = data0[0].id_asignature
    
    let query = `
    {
        asignatura(codigo_asignatura: ${codigo}) {
            nombre_asignatura
        }
    }`

    let nomCu = ''
    let response = await fetch(`${API_ROUTE}${API_URL_BUSCADOR_CURSOS}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
        },
        body: JSON.stringify({
            query,
        })
    })

    let data = await response.json()
    console.log(data)
    nomCu = await data.data.asignatura.nombre_asignatura

    return nomCu
}