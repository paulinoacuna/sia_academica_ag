import { graphqlHTTP } from "express-graphql";
import express from "express";
import routes from "./routes.js";

import { INFO_ACADEMICA } from "./sia_infoAcademica/index.js";
import { INSCRIPCIONES } from "./sia_inscripciones/index.js";
import { BUSCADOR_CURSOS } from "./sia_buscadorMaterias/index.js";
import { CALIFICACIONES } from "./sia_calificaciones/index.js";


const app = express();
const port = 4001;

// Generate the GraphQL endpoint at /info_academica using the schema and the resolver
app.use(routes.infoAcademica.route, graphqlHTTP(INFO_ACADEMICA));
app.use(routes.inscripciones.route, graphqlHTTP(INSCRIPCIONES));
app.use(routes.calificaciones.route, graphqlHTTP(CALIFICACIONES));
app.use(routes.buscadorMaterias.route, graphqlHTTP(BUSCADOR_CURSOS));

// Open a port to listen for requests from the client (browser), using the express app with GraphQL
// For example: http://localhost:4000/info_personal
app.listen(port, () =>
  console.log(`Now browse to localhost:${port}/[endpoint_name]`)
);
