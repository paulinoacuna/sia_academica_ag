import fetch from "node-fetch";
import { API_URL } from "./index.js";
import { RpcClient } from "./rpc_client.js";

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
  ingresarCurso: (args) => {
    // Use http://127.0.0.1:4000/curso
    return fetch(`${API_URL}/curso`, {
      method: "POST",

      body: JSON.stringify(args),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return { message: data };
      });
  },
  inscribirEstudiante: (args) => {
    // Use RpcClient to send a message to the queue and get the response
    let client = new RpcClient();
    client.call(args);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: client.getResponse() });
      }, 300);
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
