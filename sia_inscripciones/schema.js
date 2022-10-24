import { buildSchema } from "graphql";

/**
 * The GraphQL schema in string form
 * @type {GraphQLSchema} schema
 */

const schema = buildSchema(`
    type Query {
        inscripcionByIdCurso(id_curso: String): [CursoInscritoFilter]
        obtenerProfesor(documento_identidad: String): ProfesorOutput
        cursosByCodigoAsignatura(codigo_asignatura: Int): [Curso]
        horarioByDocumentoEstudiante(documento_estudiante: String): [Curso]
        cursoByProfesor(documento_identidad: String): [Curso]
    }
    type Horario {
        dia: Int
        hora_inicio: Int
        hora_fin: Int
        salon: String
        documento_profesor: String
        tipo: String
    }
    input HorarioInput {
        dia: Int
        hora_inicio: Int
        hora_fin: Int
        salon: String
        documento_profesor: String
        tipo: String
    }
    type CursoInscrito {
        id_curso: String!
        documento_estudiante: String!
    }
    type Curso{
        id_curso: String!
        codigo_asignatura: Int!
        grupo: Int!
        horarios: [Horario]
        cupos_disponibles: Int!
        cupos_totales: Int!
    }
    type CursoInscritoFilter {
        id_curso: String
        documento_estudiante: String
    }
    type Profesor {
        documento_identidad: String!
        nombre_completo: String!
        email_institucional: String!
    }
        type ProfesorOutput {
        documento_identidad: String
        nombre_completo: String
        email_institucional: String
    }

    type Message {
        message: String
    }
    type Mutation {
        ingresarCurso(
            id_curso: String!
            codigo_asignatura: Int!
            grupo: Int!
            horarios: [HorarioInput]
            cupos_disponibles: Int!
            cupos_totales: Int!
        ): Message
        inscribirEstudiante(
            id_curso: String!
            documento_estudiante: String!
        ): Message
        ingresarProfesor(
            documento_identidad: String!
            nombre_completo: String!
            email_institucional: String!
        ): Message
    }
    `);

export default schema;
