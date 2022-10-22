import schema from "./schema.js";
import { root } from "./resolver.js";
import routes from "../routes.js";

// Expose the API URL
export const API_URL = routes.inscripciones.url;

// Expose the schema and the resolver
export const INSCRIPCIONES = {
  schema: schema,
  rootValue: root,
  graphiql: true,
};

/*
Para filtrar curso por id_curso, se debe usar la siguiente consulta:
query cursoInscritoById {inscripcionByIdCurso(id_curso: "002")
	{
    documento_estudiante
  }
}
Para ingresar un curso se debe enviar un JSON con la siguiente estructura:
mutation ingresarCurso {
  ingresarCurso(id_curso: "023", codigo_asignatura: 1, grupo: 22, horarios: {
    dia: 2
    hora_inicio: 9
    hora_fin: 11
    salon: "401 - 204"
    documento_profesor: "1022420004"
    tipo: "Teórica"
  }
  cupos_disponibles: 20
  cupos_totales: 40
  ) {
    message
  }

}

Para inscribir un estudiante se debe enviar un JSON con la siguiente estructura:
mutation inscribirEstudiante {
  inscribirEstudiante(id_curso: "002", documento_estudiante: "1001347151")
  {
    message
  }
}

Para ingresar un profesor se debe enviar un JSON con la siguiente estructura:
mutation ingresarProfesor{
  ingresarProfesor(documento_identidad: "1022420004", nombre_completo: "David Fernando Rodríguez Alarcón", email_institucional: "drodrigueza@unal.edu.co")
  {
    message
  }
}
 */
