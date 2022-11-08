import { buildSchema } from "graphql"

/**
 * The GraphQL schema in string form
 * @type {GraphQLSchema} schema
 */

const schema = buildSchema(`
    type Query {
        listAll: All
        listGrades(id: Int, course: Int): [Grade]
        listCourse(id: Int, termn: String): [Course]
        listHistory(id: Int, program: Int): [History]
        getCourseName(id_course: Int): Message
        formatStudents(course: Int, student: String): [StudentsGrade]
    }

    type StudentsGrade {
        id: Int
        id_student: String
        id_course: Int
        grades: String
    }

    type All {
        history: [History]
        courses: [Course]
        grades: [Grade]
    }

    type Grade {
        id: Int
        id_course: Int
        name: String
        percentage: Float
        grades: String
    }

    type Course{
        id: Int
        id_asignature: Int
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
    
    type Mutation {
        createGrades(
            id: Int
            id_course: Int
            name: String
            percentage: Float
            grades: String
            ): Grade
            
        updateGrades(
            id: Int
            id_course: Int
            name: String
            percentage: Float
            grades: String
            ): Grade
            
        deleteGrades(
            input: Int
            ): Message

        updateCourse(
            id: Int
            id_asignature: Int
            term: String
            consolidated: Boolean
            ): Course
            
        updateHistory(
            id: Int
            id_student: String
            id_program: Int
            percentage_adv: Float
            asignature_taken: [Int]
            ): History
    }

    type Message {
        message: String
    }
    `
)

export default schema