export const queryHistory = (args) => `
    {
        listHistory(id: ${args.history}, program: null) {
            id
            id_student
            id_program
            percentage_adv
            asignature_taken
        }
    }
`

export const queryAsignatures = (args) => `
    {
        listAsignatures(id: ${args.asignature}, termn: null) {
            id
            term
            consolidated
        }
    }
`

export const queryGrades = (args) => `
    {
        listGrades(id: ${args.grade}, asignature: null) {
            id
            id_asignature
            name
            percentage
            id_students
            values
        }
    }
`