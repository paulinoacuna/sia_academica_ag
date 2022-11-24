import schema from "./schema.js"
import { root } from "./resolver.js"
import routes from "../routes.js"


// Expose the API URL
export const API_URL = routes.infoAcademica.url
export const API_URL_CALIFICACIONES = routes.current.url + ":" + routes.current.port + routes.calificaciones.route
export const API_URL_BUSCADOR_CURSOS = routes.current.url + ":" + routes.current.port + routes.buscadorMaterias.route

// Expose the schema and the resolver
export const INFO_ACADEMICA = {
    schema: schema,
    rootValue: root,
    graphiql: true,
}

/*
{
  user(history: 76654334, asignature: 1234456, grade: 1) {
    _documento_identidad
    _id_historia
    _id_programa
    _porcentaje_avance
    _papa
    _pa
    _semestreActual
    _pappi
    _asignaturas {
      _codigo
      _nombre
      _creditos
      _tipo
      _periodo
      _esAprobada
    }
  }
}
 */
