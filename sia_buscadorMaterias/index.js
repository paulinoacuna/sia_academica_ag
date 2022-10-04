import routes from "../routes.js"
import schema from "./newSchema.js"


// Expose the API URL
export const API_URL = routes.buscadorMaterias.url

// Expose the schema and the resolver
export const BUSCADOR_CURSOS = {
    schema: schema,
    graphiql: true,
}


/*
NOTES:
1. To update the user data, use the following query:
mutation {
  updateUser(
    nombre_usuario: "test"
    lugar_expedicion: "NEW PLACE"
    email_personal: "NEW EMAIL"
    telefono_movil: "NEW PHONE"
    eps: "NEW EPS SANITAS"
    situacion_militar: "N"
    vivienda: [
    {
      vivienda_tipo: ""
      vivienda_direccion: ""
      vivienda_departamento: ""
      vivienda_codigo_postal: ""
      vivienda_telefono: ""
      vivienda_estrato: ""
    },
    {
      vivienda_tipo: "a"
      vivienda_direccion: ""
      vivienda_departamento: ""
      vivienda_codigo_postal: ""
      vivienda_telefono: ""
      vivienda_estrato: "5"
    },
  ]
  ) {
    message
  }
}

2. To get the user data, use the following query:
{
  user(username: "test") {
    nombre_usuario
    vivienda {
      vivienda_tipo
      vivienda_estrato
    }
  }
}
 */
