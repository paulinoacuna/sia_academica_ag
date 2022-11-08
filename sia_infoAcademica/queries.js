export const getHistoryData = (args) => `
    {
        listHistory(id: ${args.id}, program: null) {
            id
            id_student
            id_program
            percentage_adv
            asignature_taken
        }
    }
`


export const getCurso = (args) => `
    {
        listCourse(id: ${args}, termn: null) {
            id
            id_asignature
            term
            consolidated
        }
    }
`



export const getCalificaciones = (args) => `
    {
        listGrades(id: null, course: ${args.id}) {
            id
            id_course
            name
            percentage
            grades
        }
    }
`