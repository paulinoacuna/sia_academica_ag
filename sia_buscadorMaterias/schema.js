import { buildSchema } from "graphql";

/**
 * The GraphQL schema in string form
 * @type {GraphQLSchema} schema
 */

// pacuna

const schema = buildSchema(`
type Asignatura {
  codigo_asignatura: Int!
  nombre_asignatura: String
  creditos: Int
  descripcion: String
  tipo: Tipologia
  programa: Programa
}

type Tipologia {
  id_tipologia: Int!
  nombre_tipologia: String!
  asignaturas: [Asignatura]
}

type Prerequisito {
  id: Int!
  codigo_asignatura: String!
  codigo_asignatura_prerequisito: String!
  es_correquisito: Boolean!
}

type Programa {
  id_programa: Int!
  nombre_programa: String!
  facultad: Facultad!
  asignaturas: [Asignatura]
}

type Facultad {
  id_facultad: Int!
  nombre_facultad: String!
  sede: Sede!
  programas: [Programa]
}

type Sede {
  id_sede: Int!
  nombre_sede: String!
  facultades: [Facultad]
}

type Query {
  asignaturas: [Asignatura]
  asignatura(codigo_asignatura: Int!): Asignatura
  sedes: [Sede]
  sede(id_sede: Int!): Sede
  facultades: [Facultad]
  facultad(id_facultad: Int!): Facultad
  programas: [Programa]
  programa(id_programa: Int!): Programa
  tipologias: [Tipologia]
  tipologia(id_tipologia: Int!): Tipologia
}
`);

export default schema;
