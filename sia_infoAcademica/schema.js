import { buildSchema } from "graphql"


/**
 * The GraphQL schema in string form
 * @type {GraphQLSchema} schema
 */

// pacuna

const schema = buildSchema(`
    type Query {
        user(username: String): HistoriaAcademica
    }

    type HistoriaAcademica {
        _documento_identidad: String
        _id_historia: String
        _id_programa: String
        _porcentaje_avance: String
        _papa: String
        _pa: String
        _semestreActual: String
        _pappi: String
        _asignaturas: [Asignatura]
    }

    type Asignatura {
        _codigo: String
        _nombre: String
        _creditos: String
        _tipo: String
        _periodo: String
        _esConsolidada: String
        _calificaciones: [Calificacion]
        _definitiva: String
        _esAprobada: String
    }

    type Calificacion {
        _nombre: String
        _nota: String
        _porcentaje: String
    }

    type Message {
        message: String
    }
    
`)


export default schema
