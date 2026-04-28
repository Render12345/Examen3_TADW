import Layout from "../components/Layout";
import { useHorario } from "../hooks/useHorario";
import obtenerSiguientesClases from "../utils/obtenerSiguientesClases";
import React from "react";

function Horario(params) {
  // Desestructuramos lo que nos devuelve el hook
  const { horario, loading, error } = useHorario();

  // Manejo de estado de carga
  // Sustituye tu bloque de: if (loading) { ... } por esto:

  if (loading) {
    return (
      <Layout>
        <div className="text-center p-4 animate-pulse">
          {/* Skeleton del Título */}
          <div className="skeleton h-8 w-64 mx-auto mt-8 mb-12"></div>

          <div className="w-full">
            <div className="mx-auto px-6 lg:px-8">
              <div className="mt-2 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
                {/* COLUMNA 1: Horario por día */}
                <div className="relative lg:row-span-2 bg-gray-800/50 rounded-4xl p-8 flex flex-col gap-4">
                  <div className="skeleton h-6 w-32 mb-4"></div>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="skeleton h-16 w-full rounded-xl"
                    ></div>
                  ))}
                </div>

                {/* COLUMNA 2 - ARRIBA: Próximas clases */}
                <div className="relative max-lg:row-start-1 bg-gray-800/50 rounded-4xl p-8 flex flex-col gap-4">
                  <div className="skeleton h-6 w-40"></div>
                  <div className="skeleton h-10 w-full"></div>
                  <div className="skeleton h-32 w-full rounded-lg"></div>
                </div>

                {/* COLUMNA 2 - ABAJO: Stats */}
                <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2 bg-gray-800/50 rounded-lg p-6">
                  <div className="skeleton h-5 w-20 mb-4"></div>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <div className="skeleton h-20 w-24"></div>
                    <div className="skeleton h-20 w-24"></div>
                    <div className="skeleton h-20 w-24"></div>
                  </div>
                </div>

                {/* COLUMNA 3: Horario por materia */}
                <div className="relative lg:row-span-2 bg-gray-800/50 rounded-4xl p-8 flex flex-col gap-4">
                  <div className="skeleton h-6 w-40 mb-4"></div>
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="skeleton h-14 w-full rounded-xl"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Manejo de errores (por ejemplo, si el token expiró)
  if (error) {
    return (
      <Layout>
        <div className="p-8 text-center text-red-500">Error: {error}</div>
      </Layout>
    );
  }

  const materias = horario?.data?.[0]?.horario || [];

  // Accedemos de forma segura al array interno
  //   const listaMaterias = horario?.data?.[0]?.horario || [];

  const diasSemana = [
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
  ];

  const horarioPorDia = diasSemana.map((dia) => {
    const clasesDelDia = materias
      .filter((m) => m[dia] !== null) // Solo las que tienen clase ese día
      .map((m) => ({
        nombre: m.nombre_materia,
        hora: m[dia],
        salon: m[`${dia}_clave_salon`],
        id: m.id_grupo,
      }));

    return {
      diaNombre: dia.charAt(0).toUpperCase() + dia.slice(1),
      diaKey: dia,
      clases: clasesDelDia,
    };
  });

  const proximasClases = obtenerSiguientesClases(horario, 5);
  // Cortamos el arreglo: omitimos la 1ra (index 0) y tomamos las siguientes 4
  const siguientes4Materias = proximasClases.slice(1, 5);

  // 1. Función auxiliar para calcular duración (ej: "12:00-13:00" -> 1.0)
  const calcularDuracion = (rango) => {
    if (!rango) return 0;
    const [inicio, fin] = rango.split("-");
    const [h1, m1] = inicio.split(":").map(Number);
    const [h2, m2] = fin.split(":").map(Number);
    return h2 + m2 / 60 - (h1 + m1 / 60);
  };

  const diasClave = [
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
  ];

  // 2. Variables para acumular resultados
  let totalHorasSemana = 0;
  let conteoMateriasPorDia = {
    lunes: 0,
    martes: 0,
    miercoles: 0,
    jueves: 0,
    viernes: 0,
    sabado: 0,
  };

  // 3. Procesar el arreglo materias directamente
  materias.forEach((materia) => {
    diasClave.forEach((dia) => {
      if (materia[dia]) {
        // Si el día tiene horario, sumamos la materia y calculamos sus horas
        conteoMateriasPorDia[dia] += 1;
        totalHorasSemana += calcularDuracion(materia[dia]);
      }
    });
  });

  // 4. Obtener el día con más materias
  const diaMasPesadoClave = Object.keys(conteoMateriasPorDia).reduce((a, b) =>
    conteoMateriasPorDia[a] > conteoMateriasPorDia[b] ? a : b,
  );

  // 5. Cálculos finales para la UI
  const promedioDiario = (totalHorasSemana / 5).toFixed(1); // Dividido entre 5 días hábiles
  const diaPicoNombre =
    diaMasPesadoClave.charAt(0).toUpperCase() + diaMasPesadoClave.slice(1);
  const numMateriasPico = conteoMateriasPorDia[diaMasPesadoClave];

  return (
    <Layout>
      <div className="text-center p-4">
        <h1 className="text-2xl text-center mt-8">{horario?.message}</h1>

        {/* bento */}
        <div className=" w-full">
          <div className="mx-auto px-6 lg:px-8">
            <div className="mt-2 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
              <div className="relative lg:row-span-2">
                <div className="absolute inset-px rounded-lg bg-gray-800 lg:rounded-l-4xl" />
                <div className="relative flex h-full flex-col justify-around overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                  <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                    <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">
                      Horario por dia
                    </p>
                  </div>
                  {/* map de horario por dia */}
                  {horarioPorDia.map((item) => (
                    <div
                      key={item.diaKey}
                      className="bg-base-100 border-base-300 collapse my-4 collapse-arrow border"
                    >
                      <input type="checkbox" className="peer" />

                      <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content font-bold">
                        {item.diaNombre}
                        {/* Badge opcional para ver cuántas clases hay ese día */}
                        <span className="badge badge-ghost ml-2">
                          {item.clases.length}
                        </span>
                      </div>

                      <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                        <div className="overflow-x-auto">
                          <table className="table w-full">
                            <thead>
                              <tr className="text-secondary-content/70">
                                <th>Materia</th>
                                <th>Hora</th>
                                <th>Salón</th>
                              </tr>
                            </thead>
                            <tbody>
                              {item.clases.length > 0 ? (
                                item.clases.map((clase) => (
                                  <tr
                                    key={`${clase.id}-${item.diaKey}`}
                                    className="hover:bg-black/10"
                                  >
                                    <td className="font-medium">
                                      {clase.nombre}
                                    </td>
                                    <td>{clase.hora}</td>
                                    <td>
                                      <span className="badge badge-outline">
                                        {clase.salon}
                                      </span>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td
                                    colSpan="3"
                                    className="text-center italic opacity-70"
                                  >
                                    No tienes clases programadas
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 lg:rounded-l-4xl" />
              </div>

              <div className="relative max-lg:row-start-1 min-w-0">
                <div className="absolute inset-px rounded-lg bg-gray-800 max-lg:rounded-t-4xl" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] w-full">
                  <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                    <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">
                      Proximas clases:
                    </p>
                    <p className="mt-2 max-w-lg text-primary max-lg:text-center font-bold p-2">
                      {proximasClases[0].nombre} {proximasClases[0].diaNombre} a
                      las {proximasClases[0].horaCompleta} en{" "}
                      {proximasClases[0].salon}
                    </p>
                  </div>
                  <div className="overflow-x-auto w-full max-w-full bg-base-100 p-4 m-4 rounded-lg shadow border border-base-300">
                    <table className="table text-center w-full min-w-[500px]">
                      <thead>
                        <tr className="bg-base-200">
                          <th className="text-left">Detalle</th>
                          <th>1</th>
                          <th>2</th>
                          <th>3</th>
                          <th>4</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-base-200/50">
                          <th className="text-left font-bold">Materia</th>
                          {siguientes4Materias.map((clase, index) => (
                            <td
                              key={`materia-${index}`}
                              className="font-medium"
                            >
                              {clase.nombre}
                            </td>
                          ))}
                        </tr>

                        <tr className="hover:bg-base-200/50">
                          <th className="text-left font-bold">Hora</th>
                          {siguientes4Materias.map((clase, index) => (
                            <td key={`hora-${index}`}>
                              <div className="flex flex-col items-center">
                                <span className="text-xs opacity-70 uppercase tracking-wider">
                                  {clase.diaNombre}
                                </span>
                                <span>{clase.horaCompleta}</span>
                              </div>
                            </td>
                          ))}
                        </tr>

                        <tr className="hover:bg-base-200/50">
                          <th className="text-left font-bold">Lugar</th>
                          {siguientes4Materias.map((clase, index) => (
                            <td key={`lugar-${index}`}>
                              <span className="badge badge-outline">
                                {clase.salon}
                              </span>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-t-4xl" />
              </div>

              <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
                <div className="absolute inset-px rounded-lg bg-gray-800" />
                <div className="relative flex h-full flex-col justify-around overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                  <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                    <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">
                      Stats:
                    </p>
                  </div>
                  {/* Reemplaza tu sección de Stats con esto */}
                  <div className="stats stats-vertical lg:stats-horizontal shadow">
                    <div className="stat">
                      <div className="stat-title">Promedio Diario</div>
                      <div className="stat-value text-primary">
                        {promedioDiario} hrs
                      </div>
                      <div className="stat-desc">
                        Basado en semana de 5 días
                      </div>
                    </div>

                    <div className="stat">
                      <div className="stat-title">Cantidad de materias</div>
                      <div className="stat-value text-secondary">
                        {materias.length}
                      </div>
                      <div className="stat-desc">
                        {materias.length} materias programadas
                      </div>
                    </div>

                    <div className="stat">
                      <div className="stat-title">Total Semanal</div>
                      <div className="stat-value">{totalHorasSemana} hrs</div>
                      <div className="stat-desc">Horas de clase</div>
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15" />
              </div>

              <div className="relative lg:row-span-2">
                <div className="absolute inset-px rounded-lg bg-gray-800 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
                <div className="relative flex h-full flex-col justify-around overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                  <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                    <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">
                      Horario por materia
                    </p>
                  </div>
                  {/* lista de materias */}
                  {materias.map((materia) => (
                    <div className="bg-base-100 border-base-300 collapse my-4 collapse-arrow border">
                      <input type="checkbox" className="peer" />
                      <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                        {/* {JSON.stringify(materias)} */}
                        {materia.nombre_materia}
                      </div>
                      <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                        <div className="overflow-x-auto">
                          <table className="table">
                            {/* head */}
                            <thead>
                              <tr>
                                <th>Lunes</th>
                                <th>Martes</th>
                                <th>Miercoles</th>
                                <th>Jueves</th>
                                <th>Viernes</th>
                                <th>Sabado</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                {/* Lunes */}
                                <td>
                                  {materia.lunes &&
                                    `${materia.lunes} en: ${materia.lunes_clave_salon}`}
                                </td>

                                {/* Martes */}
                                <td>
                                  {materia.martes &&
                                    `${materia.martes} en: ${materia.martes_clave_salon}`}
                                </td>

                                {/* Miercoles */}
                                <td>
                                  {materia.miercoles &&
                                    `${materia.miercoles} en: ${materia.miercoles_clave_salon}`}
                                </td>

                                {/* Jueves */}
                                <td>
                                  {materia.jueves &&
                                    `${materia.jueves} en: ${materia.jueves_clave_salon}`}
                                </td>

                                {/* Viernes */}
                                <td>
                                  {materia.viernes &&
                                    `${materia.viernes} en: ${materia.viernes_clave_salon}`}
                                </td>

                                {/* Sabado */}
                                <td>
                                  {materia.sabado &&
                                    `${materia.sabado} en: ${materia.sabado_clave_salon}`}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Horario;
