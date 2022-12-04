import { buildSchema } from "graphql"


/**
 * The GraphQL schema in string form
 * @type {GraphQLSchema} schema
 */
const schema = buildSchema(`

type Query {
  getHistory(id: String): [History]
}

  type History {
    _documento_identidad: String
    _id_historia: Int
    _id_programa: Int
    _porcentaje_avance: Float
    _papa: Float
    _pa: Float
    _semestreActual: String
    _pappi: Float
    _asignaturasInscritas: [Asignaturas]
    _asignaturas: [Asignaturas]
  }

  type Asignaturas {
    _codigo: Int
    _id_asignature: Int
    _nombre: String
    _creditos: Int
    _tipo: String
    _periodo: String
    _esConsolidada: Boolean
    _definitiva: Float
    _esAprobada: Boolean
    _calificaciones: [Calificaciones]
  }
 
  type Calificaciones {
    _nombre: String
    _porcentaje: Float
    _nota: Float
  }
  

  type Message {
    message: String
}

`)


export default schema
