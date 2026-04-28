const obtenerSiguientesClases = (horarioData, cantidad = 5) => {
  const listaMaterias = horarioData?.data?.[0]?.horario || [];

  // 1. Mapa para convertir días a números (Date.getDay() usa 0 para Domingo, 1 para Lunes...)
  const mapaDias = {
    lunes: 1,
    martes: 2,
    miercoles: 3,
    jueves: 4,
    viernes: 5,
    sabado: 6,
  };

  // 2. Crear una lista plana con todas las clases de la semana
  let todasLasClases = [];

  listaMaterias.forEach((materia) => {
    Object.keys(mapaDias).forEach((dia) => {
      if (materia[dia]) {
        // Extraemos la hora de inicio (ej. de "11:00-13:00" sacamos "11:00")
        const horaInicio = materia[dia].split("-")[0];

        todasLasClases.push({
          nombre: materia.nombre_materia,
          diaNombre: dia.charAt(0).toUpperCase() + dia.slice(1), // Ej. "Lunes"
          diaNum: mapaDias[dia],
          horaCompleta: materia[dia],
          horaInicio: horaInicio,
          salon: materia[`${dia}_clave_salon`],
          // Creamos un valor numérico para ordenar fácilmente (ej. Lunes 11:00 -> 111.00)
          valorOrden:
            mapaDias[dia] * 100 + parseFloat(horaInicio.replace(":", ".")),
        });
      }
    });
  });

  // 3. Ordenar todas las clases cronológicamente en la semana
  todasLasClases.sort((a, b) => a.valorOrden - b.valorOrden);

  // 4. Obtener el día y hora actual
  const ahora = new Date();
  const diaActual = ahora.getDay(); // 0-6
  const horaActualNum = ahora.getHours() + ahora.getMinutes() / 100;
  const valorActual = diaActual * 100 + horaActualNum;

  // 5. Filtrar las clases que siguen en esta semana
  let clasesFuturas = todasLasClases.filter((c) => c.valorOrden > valorActual);

  // 6. Si no completamos las 5 clases, agregamos las de la siguiente semana (empezando desde el principio del array)
  while (clasesFuturas.length < cantidad) {
    // Concatenamos la lista completa tantas veces como sea necesario
    clasesFuturas = [...clasesFuturas, ...todasLasClases];
  }

  // 7. Retornar solo la cantidad solicitada
  return clasesFuturas.slice(0, cantidad);
};

export default obtenerSiguientesClases;
