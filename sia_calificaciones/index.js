import schema from "./schema.js"
import { root } from "./resolver.js"
import routes from "../routes.js"


// Expose the API URL
export const API_URL = routes.calificaciones.url
export const API_URL_BUSCADOR_CURSOS = routes.buscadorMaterias.url + routes.buscadorMaterias.route
export const API_URL_INSCRIPCIONES = routes.inscripciones.url + routes.inscripciones.route

// Expose the schema and the resolver
export const CALIFICACIONES = {
    schema: schema,
    rootValue: root,
    graphiql: true,
}

/*
1. Query to Grades:
    {
        listGrades(id: null, asignature: 1234456) {
            id
            id_asignature
            name
            percentage
            id_students
            values
        }
    }
*/
