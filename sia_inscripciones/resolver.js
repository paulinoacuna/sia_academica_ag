import fetch from "node-fetch";
import { API_URL } from "./index.js";
import { callRpc } from "./rpc_client.js";
import routes from "../routes.js";

const API_URL_BUSCADOR_CURSOS = routes.buscadorMaterias.url;

async function simpleGraphQLQuery(query, variables = {}) {
  const response = await fetch(API_URL_BUSCADOR_CURSOS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  })
    .then((r) => r.json())
    .then((data) => {
      return data;
    });
  return response;
}

/**
 * Provide a resolver function for each API endpoint (query)
 * @type {{updateUser: (function(*): Promise<unknown>), user: (function(*): Promise<DataTransferItem>)}}
 * @param {Object} args - The arguments passed in the query
 * @returns {Promise<unknown>} - The response from the API
 */

export const root = {
  // Use http://127.0.0.1:4000/inscripcion/[id_curso]
  inscripcionByIdCurso: (args) => {
    let id = args.id_curso;
    console.log("id: ", id);
    return fetch(`${API_URL}/inscripcion/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res: ", res);
        return res;
      });
  },
  ingresarCurso: async (args) => {
    // Use http://127.0.0.1:4000/curso

    //query de asignatura
    let query = `{
      asignatura(codigo_asignatura: ${args.codigo_asignatura}) {
        codigo_asignatura
      }
    }
    `;
    //verificar que la asignatura exista
    let asignatura = await simpleGraphQLQuery(query);
    console.log("asignatura: ", asignatura.data.asignatura);
    if (asignatura.data.asignatura == null) {
      return {
        message: "La asignatura no existe",
      };
    }
    return fetch(`${API_URL}/curso`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(args),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return { message: data };
      });
  },
  inscribirEstudiante: async (args) => {
    // Use RpcClient to send a message to the queue and get the response
    return callRpc(args).then((res) => {
      return { message: res };
    });
  },
  ingresarProfesor: (args) => {
    // Use http://http://127.0.0.1:4000/profesor
    return fetch(`${API_URL}/profesor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    })
      .then((response) => response.json())
      .then((data) => {
        return { message: data };
      });
  },

  obtenerProfesor: async (args) => {
    // Use http://http://127.0.0.1:4000/profesor/[documento_identidad]
    let id = args.documento_identidad;
    console.log("id: ", id);
    return fetch(`${API_URL}/profesor/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      });
  },
  cursosByCodigoAsignatura: async (args) => {
    // Use http://127.0.0.1:4000/cursos/[codigo_asignatura]
    let id = args.codigo_asignatura;
    return fetch(`${API_URL}/cursos/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data: ", data);
        data.forEach((curso) => {
          curso.horarios = JSON.parse(curso.horarios);
        });
        console.log("data: ", data);
        return data;
      });
  },
  horarioByDocumentoEstudiante: async (args) => {
    // Use http://127.0.0.1:4000/horario/[documento_estudiante]
    let id = args.documento_estudiante;
    return fetch(`${API_URL}/horario/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data: ", data);
        data.forEach((curso) => {
          curso.horarios = JSON.parse(curso.horarios);
        });
        console.log("data: ", data);
        return data;
      });
  },
};

/*
Para filtrar curso por documento_estudiante, se debe usar la siguiente consulta:
query cursoInscritoById {inscripcionByIdCurso(documento_estudiante: "1001347151")
	{
    id_curso
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
