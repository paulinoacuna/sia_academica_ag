import fetch from "node-fetch"
import { API_URL, API_URL_CALIFICACIONES, API_URL_BUSCADOR_CURSOS } from "./index.js"
import { getHistoryData, getCurso, getCalificaciones, getAsignatura, getTipologia } from "./queries.js";



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
            const asignatures_taken = jsonHistory[0].asignature_taken

            

            let id_cursos_tomados = []

            if(typeof asignatures_taken === "string"){
                id_cursos_tomados = JSON.parse(asignatures_taken);
            }else if (typeof asignatures_taken === "object"){
                id_cursos_tomados = asignatures_taken
            }

            // console.log(asignatures_taken)
            // console.log(id_cursos_tomados)
            //casteo a string

            const funJsonCursos = async () => {

                return Promise.all(id_cursos_tomados.map(async (id_curso) => {
                    
                    
                    var curso = id_curso.toString()
                    // console.log(curso)
                    return refFetch(getCurso(curso), API_URL_CALIFICACIONES).then((response)=>{
                        
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
                        console.log(response)
                        

                        return response.data.listGrades
                    })
                }))
            }
            const jsonCalificaciones = await funjsonCalificaciones()

            

             //jahel

            

            const funGetAsignatura = async () => {

                return Promise.all(jsonCursos.map(async (curso) => {
                    // console.log(curso)

                    return refFetch(getAsignatura(curso), API_URL_BUSCADOR_CURSOS).then((response)=>{
                        // console.log(response)
                        //retorna un solo objeto o array?
                        return response.data
                    })
                }))
            }
            
            const jsonAsignaturas = funGetAsignatura()
            if(jsonAsignaturas == null){
                console.log("Elemeno no encontrado en el buscador de cursos")
            }
                /*
            const funGetTipologia = async () => {

                return Promise.all(jsonAsignaturas.map(async (asignatura) => {
                    return refFetch(getTipologia(asignatura), API_URL_BUSCADOR_CURSOS).then((response)=>{

                        //retorna un solo objeto o array?
                        return response.data.asignatura
                    })
                }))
            }
            const jsonTipologias = funGetTipologia()
            */

            //end



            // console.log(jsonAsignaturas)

            const jsonFull = {
                history: jsonHistory,
                courses: jsonCursos,
                grades: jsonCalificaciones
            }
            console.log(jsonFull)

            // console.log(jsonCalificaciones)


                    

            return refFetch(jsonFull, `${API_URL}/api/historiaAcademica`).then((response) => {
                // console.log("_______")
                // console.log(response)
                return [response]
                })

        })}
}
