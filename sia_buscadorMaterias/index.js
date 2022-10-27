import routes from "../routes.js";
import schema from "./newSchema.js";

// Expose the API URL
export const API_URL = { buscadorMaterias: routes.buscadorMaterias.url, inscripciones: routes.inscripciones.url};

// Expose the schema and the resolver
export const BUSCADOR_CURSOS = {
  schema: schema,
  graphiql: true,
};

console.log("BUSCADOR_CURSOS", "BUSCADOR_CURSOS");

/*
{
  asignaturas {
    codigo_asignatura
    nombre_asignatura
    descripcion
    tipo {
      nombre_tipologia
      id_tipologia
    }
    programa {
      nombre_programa
      facultad {
        nombre_facultad
      }
    }
  }
}
 */
