import { buildSchema } from "graphql"

/**
 * The GraphQL schema in string form
 * @type {GraphQLSchema} schema
 */

const schema = buildSchema(`
    type Query {
        listGrades(id: Int, asignature: Int): [Grade]
        listAsignatures(id: Int, termn: Int): [Asignature]
        listHistory(input: Int, program: Int): [History]
    }

    type Grade {
        id: Int
        id_asignature: Int
        name: String
        percentage: Float
        id_students: String
        values: String
    }

    type Asignature {
        id: Int
        term: String
        consolidated: Boolean
        grades: String
    }

    type History {
        id: Int
        id_student: Int
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
            id_students: Array
            values: Array): Grade
        updateGrades(input: GradeInput): Message
        deleteGrades(input: GradeInput): Message
    }

    input Array {
        name: [Int]
    }

    type Message {
        message: String
    }
    `
)

export default schema