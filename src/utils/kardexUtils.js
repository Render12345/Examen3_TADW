// export const procesarKardex = (dataKardex) => {
//   if (!dataKardex || !dataKardex.kardex) {
//     return { kardexPorSemestre: [], materiasActuales: [], kpis: {} };
//   }

//   const { kardex, porcentaje_avance } = dataKardex;

//   // 1. Agrupar por semestre
//   const semestresMap = kardex.reduce((acc, materia) => {
//     const sem = materia.semestre;
//     if (!acc[sem]) acc[sem] = [];
//     acc[sem].push(materia);
//     return acc;
//   }, {});

//   const kardexPorSemestre = Object.keys(semestresMap)
//     .sort((a, b) => Number(b) - Number(a)) // Ordenamos del semestre más reciente al primero (opcional)
//     .map((sem) => ({
//       semestre: sem,
//       materias: semestresMap[sem],
//     }));

//   // 2. Obtener materias actuales (las del periodo más reciente)
//   // Encontramos el periodo "mayor" léxicamente (ej. "25/2" es mayor que "25/1" y "24/2")
//   const periodos = kardex.map((m) => m.periodo);
//   const periodoActual = periodos.reduce((max, p) => (p > max ? p : max), "");

//   const materiasActuales = kardex.filter((m) => m.periodo === periodoActual);

//   // 3. Calcular KPIs
//   const totalMaterias = kardex.length;
//   let normales = 0;
//   let extraordinarios = 0;

//   kardex.forEach((materia) => {
//     // Si la descripción contiene la palabra "NORMAL" o "ORDINARIO"
//     if (
//       materia.descripcion.toUpperCase().includes("NORMAL") ||
//       materia.descripcion.toUpperCase().includes("ORDINARIO")
//     ) {
//       normales++;
//     } else {
//       extraordinarios++;
//     }
//   });

//   const porcentajeNormal =
//     totalMaterias > 0 ? ((normales / totalMaterias) * 100).toFixed(1) : 0;
//   const porcentajeExtra =
//     totalMaterias > 0
//       ? ((extraordinarios / totalMaterias) * 100).toFixed(1)
//       : 0;

//   const kpis = {
//     avance: porcentaje_avance,
//     porcentajeNormal,
//     porcentajeExtra,
//     totalMaterias,
//   };

//   return { kardexPorSemestre, materiasActuales, kpis, periodoActual };
// };

export const procesarKardex = (dataKardex, listaHorario = []) => {
  const listaKardex = dataKardex?.kardex || [];
  const avanceTotal = dataKardex?.porcentaje_avance || 0;

  // 1. Agrupar historial por semestre (excluyendo lo que no tenga calificación numérica si es necesario)
  const semestresMap = listaKardex.reduce((acc, materia) => {
    const sem = materia.semestre;
    if (!acc[sem]) acc[sem] = [];
    acc[sem].push(materia);
    return acc;
  }, {});

  const kardexPorSemestre = Object.keys(semestresMap)
    .sort((a, b) => b - a) // De más reciente a más antiguo
    .map((sem) => ({
      semestre: sem,
      materias: semestresMap[sem],
    }));

  // 2. Materias Actuales (Directamente desde el useHorario)
  // Mapeamos para que coincida con los nombres de columna de tu tabla
  const materiasActuales = listaHorario.map((m) => ({
    nombre_materia: m.nombre_materia,
    clave_materia: m.clave_materia,
    // Puedes agregar más campos si tu tabla de "Actuales" los requiere
  }));

  // 3. Cálculo de KPIs
  const totalMaterias = listaKardex.length;
  const cursadasNormal = listaKardex.filter((m) =>
    m.descripcion.includes("NORMAL"),
  ).length;

  return {
    kardexPorSemestre,
    materiasActuales,
    kpis: {
      avance: avanceTotal,
      porcentajeNormal:
        totalMaterias > 0 ? (cursadasNormal / totalMaterias) * 100 : 0,
      totalMaterias,
    },
  };
};
