import fetch from "node-fetch"
import { API_URL, API_URL_CALIFICACIONES } from "./index.js"
import { getHistoryData, getCurso, getCalificaciones } from "./queries.js";



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

            const jsonHistory = response.data.listHistory
            const asignatures_taken = jsonHistory[0].asignature_taken

            

            let id_cursos_tomados = []

            if(typeof asignatures_taken === "string"){
                id_cursos_tomados = JSON.parse(asignatures_taken);
            }else if (typeof asignatures_taken === "object"){
                id_cursos_tomados = asignatures_taken
            }

            

            const funJsonCursos = async () => {

                return Promise.all(id_cursos_tomados.map(async (id_curso) => {
                    return refFetch(getCurso(id_curso), API_URL_CALIFICACIONES).then((response)=>{
                        for (const element of response.data.listCourse) {
                            
                            return element
                        }
                    })
                }))
            }
            const jsonCursos = await funJsonCursos()


            const funjsonCalificaciones = async () => {
                return Promise.all(jsonCursos.map(async (curso)=>{
                    
                    return refFetch(getCalificaciones(curso), API_URL_CALIFICACIONES).then((response)=>{
                        // console.log(response.data.listGrades)
                        

                        return response.data.listGrades
                    })
                }))
            }
            const jsonCalificaciones = await funjsonCalificaciones()

            


            const jsonFull = {
                history: jsonHistory,
                courses: jsonCursos,
                grades: jsonCalificaciones
            }

            // console.log(jsonCalificaciones)


                    

            return refFetch(jsonFull, `${API_URL}/api/historiaAcademica`).then((response) => {
                // console.log("_______")
                // console.log(response)
                return [response]
                })

        })}
}
