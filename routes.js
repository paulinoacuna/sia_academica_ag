const routes = {
  current: {
    url: "http://host.docker.internal",
    port: 4001,
    route: "/",
  },
  infoAcademica: {
    url: "http://localhost:3006",
    route: "/info_academica",
  },
  buscadorMaterias: {
    url: "http://host.docker.internal:4100", //"http://host.docker.internal:4100",
    route: "/buscador_cursos",
  },
  inscripciones: {
    url: "http://host.docker.internal:4000", //"http://host.docker.internal:4000",
    route: "/inscripciones",
  },
  calificaciones: {
    url: "http://localhost:8000",
    route: "/calificaciones",
  },
};

export default routes;
