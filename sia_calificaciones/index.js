import schema from "./schema.js"
import { root } from "./resolver.js"
import routes from "../routes.js"


// Expose the API URL
export const API_URL = routes.calificaciones.url
export const API_ROUTE = routes.current.url + ":" + routes.current.port
export const API_URL_BUSCADOR_CURSOS = API_ROUTE + routes.buscadorMaterias.route
export const API_URL_INSCRIPCIONES = API_ROUTE + routes.inscripciones.route

// Expose the schema and the resolver
export const CALIFICACIONES = {
    schema: schema,
    rootValue: root,
    graphiql: true,
}

/*
#GRADES

{
  listGrades(id: 6, asignature: null) {
    	id
    	name
	percentage
  }
}

mutation {
  createGrades(id: 6
      id_asignature: 7654321
      name: "Taller 1"
      percentage: 0.3
      id_students: "jumorap"
      values: 4)
	{
    id
    name
  }
}

mutation {
  updateGrades(id: 6
      id_asignature: 7654321
      name: "Taller 1"
      percentage: 0.3
      id_students: "jumorap"
      values: 4)
	{
    id
    name
  }
}

mutation {
  deleteGrades(input: 6)
	{
	message
  	}
}


#ASIGNATURES

{
  listAsignatures(id: 1234456, termn: null) {
    id
    term
    consolidated
  }
}

mutation {
	updateAsignatures(
            id: 1234456
            term: "2022-2"
            consolidated: False
            )
	{
	id
	term
	}
}



#HISTORY

{
  listHistory(id: 76544334, program: null) {
    	id
    	id_student
	percentage_adv
  }
}

mutation {
	updateHistory(
            id: 7654334
            id_student: "jlizarazoa"
            id_program: 2234454
            percentage_adv: 0.54
            asignature_taken: [35443,43333,34334]
            )
	{
	id
	id_student
	percentage_adv
	}
}
*/
