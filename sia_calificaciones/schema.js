import { buildSchema } from "graphql"


/**
 * The GraphQL schema in string form
 * @type {GraphQLSchema} schema
 */
const schema = buildSchema(`
    type Query {
        listGrades(id: Int, asignature: Int): [Grade]
        listAsignatures(id: Int, termn: String): [Asignature]
        listHistory(id: Int, program: Int): [History]
    }

    type Grade {
        id: Int
        id_asignature: Int
        name: String
        percentage: Float
        id_students: String
        values: Float
    }

    type Asignature {
        id: Int
        term: String
        consolidated: Boolean
    }

    type History {
        id: Int
        id_student: String
        id_program: Int
        percentage_adv: Float
        asignature_taken: String
    }

    input GradeInput {
        id: Int
        id_asignature: Int
        name: String
        percentage: Float
        id_students: String
        values: String
    }
    
    type Mutation {
        createGrades(
            id: Int
            id_asignature: Int
            name: String
            percentage: Float
            id_students: String
            values: Float): Grade
        updateGrades(
            id: Int
            id_asignature: Int
            name: String
            percentage: Float
            id_students: String
            values: Float): Grade
        deleteGrades(input: Int): Message

        updateAsignatures(
            id: Int
            term: String
            consolidated: Boolean): Asignature
            
        updateHistory(
            id: Int
            id_student: String
            id_program: Int
            percentage_adv: Float
            asignature_taken: String): History
    }

    type Message {
        message: String
    }
`)

export default schema
