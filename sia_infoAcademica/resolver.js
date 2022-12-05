import fetch from "node-fetch"
import { API_URL, API_URL_CALIFICACIONES, API_URL_BUSCADOR_CURSOS } from "./index.js"
import { getHistoryData, getCurso, getCalificaciones, getAsignatura } from "./queries.js";


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
 * @type {{getHistory: (function(*): Promise<unknown | DataTransferItem>)}}
 * @param {Object} args - The arguments passed in the query
 * @returns {Promise<unknown>} - The response from the API
 */
export const root = {
    getHistory:  (arg) => {
        return  refFetch(getHistoryData(arg), API_URL_CALIFICACIONES).then( async (response) => {
            
           

            //Juliette
            
            

            const jsonHistory = response.data.listHistory
            console.log(jsonHistory)
            const asignatures_taken = jsonHistory[0].asignature_taken
            
            console.log(typeof asignatures_taken)


            let id_cursos_tomados = []

            if (typeof asignatures_taken === "string") {
                id_cursos_tomados = JSON.parse(asignatures_taken);
            }

            const funJsonCursos = async () => {

                return Promise.all(id_cursos_tomados.map(async (id_curso) => {
                    return refFetch(getCurso(id_curso), API_URL_CALIFICACIONES).then((response) => {
                        for (const element of response.data.listCourse) {
                            return element
                        }
                    })
                }))
            }

            const jsonCursos = await funJsonCursos()


            const funjsonCalificaciones = async () => {
                return Promise.all(jsonCursos.map(async (curso)=>{
                    return refFetch(getCalificaciones(curso), API_URL_CALIFICACIONES).then((response) => response.data.listGrades)
                }))
            }
            const jsonCalificaciones = await funjsonCalificaciones()

            

             //jahel

            

            const funGetAsignatura = async () => {

                return Promise.all(jsonCursos.map(async (curso) => {
                    return refFetch(getAsignatura(curso), API_URL_BUSCADOR_CURSOS).then((response) => response.data)
                }))
            }
            
            const jsonAsignaturas = await funGetAsignatura()
            if(jsonAsignaturas == null) {
                console.log("Elemeno no encontrado en el buscador de cursos")
            }

        
            let i = 0
            jsonCursos.forEach(curso => {
                curso.nombre_asignatura = jsonAsignaturas[i].asignatura.nombre_asignatura
                curso.nombre_tipologia = jsonAsignaturas[i].asignatura.tipo.nombre_tipologia
                i++
            });

            console.log(jsonCursos)
            const jsonFull = {
                history: jsonHistory,
                courses: jsonCursos,
                grades: jsonCalificaciones
            }


            return refFetch(jsonFull, `${API_URL}/api/historiaAcademica`).then((response) => [response])
        })}
}
