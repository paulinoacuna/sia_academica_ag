const routes = {
  current: {
    url: "http://sia-academica-ag",
    port: 80,
    route: "/",
  },
  infoAcademica: {
    url: "http://sia-info-academica-ms",
    route: "/info_academica",
  },
  buscadorMaterias: {
    url: "http://sia-buscador-materias-ms", //"http://host.docker.internal:4100",
    route: "/buscador_cursos",
  },
  inscripciones: {
    url: "http://sia-inscripciones-ms", //"http://host.docker.internal:4000",
    route: "/inscripciones",
  },
  calificaciones: {
    url: "http://sia-calificaciones-ms",
    route: "/calificaciones",
  },
};

export default routes;
