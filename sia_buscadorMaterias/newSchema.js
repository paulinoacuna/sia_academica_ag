import {
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLBoolean,
} from "graphql";

import resolver from "./resolver.js";

const Asignatura = new GraphQLObjectType({
  name: "Asignatura",
  fields: () => ({
    codigo_asignatura: { type: GraphQLInt },
    nombre_asignatura: { type: GraphQLString },
    creditos: { type: GraphQLInt },
    descripcion: { type: GraphQLString },
    tipo: {
      type: Tipologia,
      resolve: (parent) => {
        return resolver.getTipologia(parent.id_tipologia);
      },
    },
    programa: {
      type: Programa,
      resolve: (parent) => {
        return resolver.getPrograma(parent.id_programa);
      },
    },
    prerequisitos: {
      type: new GraphQLList(Prerequisito),
      resolve: (parent) => {
        return resolver.getPrerequisitos(parent.codigo_asignatura);
      },
    },
    cursos: {
      type: new GraphQLList(Curso),
      resolve: (parent) => {
        return resolver.getCursos(parent.codigo_asignatura)
      }
    }

  }),
});



const Horario = new GraphQLObjectType({
  name: "Horario",
  fields: () => ({
    dia: { type: GraphQLInt }, 
    hora_inicio: { type: GraphQLInt },
    hora_fin: { type: GraphQLInt },
    salon: { type: GraphQLString },
    documento_profesor: { type: GraphQLString },
    tipo: { type: GraphQLString },
  }),
});

const Curso = new GraphQLObjectType({
  name: "Curso",
  fields: () => ({
    id_curso: { type: GraphQLString },
    codigo_asignatura: { type: GraphQLInt },
    grupo: { type: GraphQLInt },
    horarios: { type: new GraphQLList(Horario) },
  }),
});

const Prerequisito = new GraphQLObjectType({
  name: "Prerequisitos",
  fields: () => ({
    codigo_asignatura_prerequisito: { type: GraphQLInt },
    es_correquisito: { type: GraphQLBoolean },
  }),
});

const Tipologia = new GraphQLObjectType({
  name: "Tipologia",
  fields: (parentValue, args) => ({
    id_tipologia: { type: GraphQLInt },
    nombre_tipologia: { type: GraphQLString },
    //asignaturas: { type: new GraphQLList(Asignatura) },
  }),
});

const Programa = new GraphQLObjectType({
  name: "Programa",
  fields: (parentValue, args) => ({
    id_programa: { type: GraphQLInt },
    nombre_programa: { type: GraphQLString },
    facultad: {
      type: Facultad,
      resolve: (parent) => resolver.getFacultad(parent.id_facultad),
    },
    //asignaturas: { type: new GraphQLList(Asignatura) },
  }),
});

const Facultad = new GraphQLObjectType({
  name: "Facultad",
  fields: (parentValue, args) => ({
    id_facultad: { type: GraphQLInt },
    nombre_facultad: { type: GraphQLString },
    sede: { type: Sede, resolve: (parent) => resolver.getSede(parent.id_sede) },
    //programas: { type: new GraphQLList(Programa) },
  }),
});

const Sede = new GraphQLObjectType({
  name: "Sede",
  fields: (parentValue, args) => ({
    id_sede: { type: GraphQLInt },
    nombre_sede: { type: GraphQLString },
    //facultades: { type: new GraphQLList(Facultad) },
  }),
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    asignaturas: {
      type: new GraphQLList(Asignatura),
      resolve: resolver.getAsignaturas,
    },
    asignatura: {
      type: Asignatura,
      args: { codigo_asignatura: { type: GraphQLInt } },
      resolve: (parent, args) => resolver.getAsignatura(args.codigo_asignatura),
    },
    tipologias: {
      type: new GraphQLList(Tipologia),
      resolve: resolver.getTipologias,
    },
    tipologia: {
      type: Tipologia,
      args: { id_tipologia: { type: GraphQLInt } },
      resolve: (parent, args) => resolver.getTipologia(args.id_tipologia),
    },
    programas: {
      type: new GraphQLList(Programa),
      resolve: resolver.getProgramas,
    },
    programa: {
      type: Programa,
      args: { id_programa: { type: GraphQLInt } },
      resolve: (parent, args) => resolver.getPrograma(args.id_programa),
    },
    facultades: {
      type: new GraphQLList(Facultad),
      resolve: resolver.getFacultades,
    },
    facultad: {
      type: Facultad,
      args: { id_facultad: { type: GraphQLInt } },
      resolve: (parent, args) => resolver.getFacultad(args.id_facultad),
    },
    sedes: {
      type: new GraphQLList(Sede),
      resolve: resolver.getSedes,
    },
    sede: {
      type: Sede,
      args: { id_sede: { type: GraphQLInt } },
      resolve: (parent, args) => resolver.getSede(args.id_sede),
    },
    asignaturasInscribibles: {
      type: new GraphQLList(Asignatura),
      args: { codigosAsignaturas: { type: GraphQLList(GraphQLInt) } },
      resolve: (parent, args) =>
        resolver.getAsignaturasInscribibles(args.codigosAsignaturas),
    },
  }),
});

export default new GraphQLSchema({
  query: Query,
});
