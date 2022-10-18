import { buildSchema } from "graphql"

/**
 * The GraphQL schema in string form
 * @type {GraphQLSchema} schema
 */

const schema = buildSchema(`
    type Query {
<<<<<<< Updated upstream
        listGrades(id: Int, asignature: Int): [Grade]
        listAsignatures(id: Int, termn: Int): [Asignature]
        listHistory(input: Int, program: Int): [History]
=======
        listAll(id: Int): All
        listByStudent(id: String, term: String): [StudentsGrade]
        listGrades(id: Int, course: Int): [Grade]
        listCourse(id: Int, termn: String): [Course]
        listHistory(id: Int, program: Int): [History]
        getCourseName(id_course: Int): String
        getStudents(id_course: Int): 
    }

    type StudentsGrade {
        id_student: String
        id_course: Int
        grades: String
    }

    type All {
        history: [History]
        courses: [Course]
        grades: [Grade]
>>>>>>> Stashed changes
    }

    type Grade {
        id: Int
        id_course: Int
        name: String
        percentage: Float
<<<<<<< Updated upstream
        id_students: String
        values: String
=======
        grades: String
>>>>>>> Stashed changes
    }

    type Course{
        id: Int
        id_asignature: Int
        term: String
        consolidated: Boolean
        grades: String
    }

    type History {
        id: Int
        id_student: Int
        id_program: Int
        percentage_adv: Float
        asignature_taken: [Int]
    }
    
    type gradesT {
        id_student: String
        value: Float
    }

    input gradesInput {
        id_student: String
        value: Float
    }

    type Mutation {
        createGrades(
            id: Int
            id_course: Int
            name: String
            percentage: Float
<<<<<<< Updated upstream
            id_students: Array
            values: Array): Grade
        updateGrades(input: GradeInput): Message
        deleteGrades(input: GradeInput): Message
    }

    input Array {
        name: [Int]
=======
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
>>>>>>> Stashed changes
    }

    type Message {
        message: String
    }
    `
)

export default schema