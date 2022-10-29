const routes = {
  current: {
    url: "http://host.docker.internal",
    port: 4001,
    route: "/",
  },
  infoAcademica: {
    url: "http://host.docker.internal:3001",
    route: "/info_academica",
  },
  buscadorMaterias: {
    url: "http://host.docker.internal:4100/", //"http://host.docker.internal:4100",
    route: "/buscador_cursos",
  },
  inscripciones: {
    url: "http://host.docker.internal:4000", //"http://host.docker.internal:4000",
    route: "/inscripciones",
  },
  calificaciones: {
    url: "http://host.docker.internal:8001",
    route: "/calificaciones",
  },
};

export default routes;
