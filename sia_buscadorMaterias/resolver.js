import fetch from "node-fetch";
import { API_URL } from "./index.js";

async function simpleGraphQLQuery(query, variables = {}) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  });
  const json = await response.json();
  return json.data;
}

const getAsignaturas = async () => {
  const query = `query Asignaturas {
    asignaturas {
      codigo_asignatura
      nombre_asignatura
      creditos
      descripcion
      id_programa
      id_tipologia
    }
  }`;
  const data = await simpleGraphQLQuery(query);
  return data.asignaturas;
};

const getAsignatura = async (id) => {
  const query = `query Tipologia($codigoAsignatura: Int!) {
        asignatura(codigo_asignatura: $codigoAsignatura) {
          codigo_asignatura
          nombre_asignatura
          creditos
          descripcion
          id_tipologia
          id_programa
        }
      }`;
  const data = await simpleGraphQLQuery(query, { codigoAsignatura: id });
  return data.asignatura;
};

const getTipologias = async () => {
  const query = `query Tipologias {
        tipologias {
            id_tipologia
            nombre_tipologia
        }
    }`;
  const data = await simpleGraphQLQuery(query);
  return data.tipologias;
};

const getTipologia = async (id) => {
  const query = `query Tipologia($idTipologia: Int!) {
        tipologia(id_tipologia: $idTipologia) {
          id_tipologia
          nombre_tipologia
        }
      }`;
  const data = await simpleGraphQLQuery(query, { idTipologia: id });
  return data.tipologia;
};

const getProgramas = async () => {
  const query = `query Programas {
        programas {
            id_programa
            nombre_programa
            id_facultad
        }
    }`;
  const data = await simpleGraphQLQuery(query);
  return data.programas;
};

const getPrograma = async (id) => {
  const query = `query Programa($idPrograma: Int!) {
        programa(id_programa: $idPrograma) {
          id_programa
          nombre_programa
          id_facultad
        }
      }`;
  const data = await simpleGraphQLQuery(query, { idPrograma: id });
  return data.programa;
};

const getFacultades = async () => {
  const query = `query Facultades {
        facultades {
            id_facultad
            nombre_facultad
            id_sede
        }
    }`;
  const data = await simpleGraphQLQuery(query);
  return data.facultades;
};

const getFacultad = async (id) => {
  const query = `query Facultad($idFacultad: Int!) {
        facultad(id_facultad: $idFacultad) {
          id_facultad
          nombre_facultad
          id_sede
        }
      }`;
  const data = await simpleGraphQLQuery(query, { idFacultad: id });
  return data.facultad;
};

const getSedes = async () => {
  const query = `query Sedes {
        sedes {
            id_sede
            nombre_sede
        }
    }`;
  const data = await simpleGraphQLQuery(query);
  return data.sedes;
};

const getSede = async (id) => {
  const query = `query Sede($idSede: Int!) {
        sede(id_sede: $idSede) {
          id_sede
          nombre_sede
        }
      }`;
  const data = await simpleGraphQLQuery(query, { idSede: id });
  return data.sede;
};

const getPrerequisitos = async (codigo_asignatura) => {
  const query = `query Prerequisito($codigoAsignatura: Int!) {
    prerequisito(codigo_asignatura: $codigoAsignatura) {
      codigo_asignatura
      codigo_asignatura_prerequisito
      es_correquisito
    }
  }`;

  const data = await simpleGraphQLQuery(query, {
    codigoAsignatura: codigo_asignatura,
  });
  const prerequisito = data.prerequisito;
  console.log("prerequisito", prerequisito);
  //if prerequisito is null, return empty array
  if (!prerequisito) {
    return [];
  }
  //if prerequisito is not null, return array with prerequisito
  return prerequisito;

};

const resolverOperations = {
  getAsignaturas,
  getTipologias,
  getProgramas,
  getFacultades,
  getSedes,
  getPrerequisitos,
  getTipologia,
  getPrograma,
  getFacultad,
  getSede,
  getAsignatura,
};

export default resolverOperations;
