import Layout from "../components/Layout";
import { useKardex } from "../hooks/useKardex";
import { useHorario } from "../hooks/useHorario";
import { procesarKardex } from "../utils/kardexUtils";
import React, { useMemo } from "react";

function Kardex(params) {
  // const { kardex, loading, error } = useKardex();

  const { kardex, loading: loadingKardex, error: errorKardex } = useKardex();
  const {
    horario,
    loading: loadingHorario,
    error: errorHorario,
  } = useHorario();

  // Procesamos los datos solo si ya llegaron
  const { kardexPorSemestre, materiasActuales, kpis, periodoActual } =
    useMemo(() => {
      // Agrega este console.log para ver qué está llegando realmente
      const listaHorario = horario?.data?.[0]?.horario || [];
      return procesarKardex(kardex?.data, listaHorario);
    }, [kardex, horario]);

  if (loadingKardex || loadingHorario) {
    return (
      <Layout>
        <div className="text-center p-4 animate-pulse">
          <div className="skeleton h-8 w-64 mx-auto mt-8 mb-12"></div>
          <div className="w-full">
            <div className="mx-auto px-6 lg:px-8">
              {/* Ajustamos el skeleton al nuevo grid de 3 columnas */}
              <div className="mt-2 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
                {/* Columna 1 (ocupa 2 espacios): Semestres */}
                <div className="relative lg:col-span-2 lg:row-span-2 bg-gray-800/50 rounded-4xl p-8 flex flex-col gap-4">
                  <div className="skeleton h-6 w-48 mb-4"></div>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="skeleton h-16 w-full rounded-xl"
                    ></div>
                  ))}
                </div>

                {/* Columna 2 - Fila 1: Materias Actuales */}
                <div className="relative lg:col-start-3 lg:row-start-1 bg-gray-800/50 rounded-4xl p-8 flex flex-col gap-4">
                  <div className="skeleton h-6 w-40"></div>
                  <div className="skeleton h-48 w-full rounded-lg"></div>
                </div>

                {/* Columna 2 - Fila 2: KPIs */}
                <div className="relative lg:col-start-3 lg:row-start-2 bg-gray-800/50 rounded-4xl p-8 flex flex-col gap-4">
                  <div className="skeleton h-6 w-32 mb-4"></div>
                  <div className="skeleton h-24 w-full"></div>
                  <div className="skeleton h-24 w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (errorKardex || errorHorario) {
    return (
      <Layout>
        <div className="p-8 text-center text-red-500">Error: {error}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="text-center p-4">
        <h1 className="text-2xl text-center mt-8 font-bold text-neutral-content">
          {kardex?.message || "Kardex del Alumno"}
        </h1>

        <div className="w-full">
          <div className="mx-auto px-6 lg:px-8">
            <div className="mt-2 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
              {/* COLUMNA 1 (Filas 1 y 2): KARDEX POR SEMESTRE */}
              <div className="relative lg:col-span-2 lg:row-span-2 min-w-0">
                <div className="absolute inset-px rounded-lg bg-neutral lg:rounded-l-4xl" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)] w-full">
                  <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                    <p className="mt-2 text-lg font-medium tracking-tight text-neutral-content max-lg:text-center">
                      Kardex por Semestre
                    </p>
                  </div>

                  <div className="p-4 sm:p-8 overflow-y-auto max-h-[800px] w-full">
                    {kardexPorSemestre.map((item) => (
                      <div
                        key={`sem-${item.semestre}`}
                        className="bg-base-100 border-base-300 collapse my-4 collapse-arrow border w-full"
                      >
                        <input type="checkbox" className="peer" />
                        <div className="collapse-title bg-success text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content font-bold flex justify-between">
                          <span>Semestre {item.semestre}</span>
                          <span className="badge badge-ghost ml-2">
                            {item.materias.length} materias
                          </span>
                        </div>
                        <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                          <div className="overflow-x-auto w-full">
                            <table className="table w-full text-center justify-around min-w-125">
                              <thead>
                                <tr className="text-secondary-content/70">
                                  <th className="text-left">Materia</th>
                                  <th>Clave</th>
                                  <th>Créditos</th>
                                  <th>Calificación</th>
                                </tr>
                              </thead>
                              <tbody>
                                {item.materias.map((m) => (
                                  <tr
                                    key={m.clave_materia}
                                    className="hover:bg-black/10"
                                  >
                                    <td className="text-left font-medium whitespace-normal min-w-[150px]">
                                      {m.nombre_materia}
                                    </td>
                                    <td>
                                      <span className="badge badge-outline">
                                        {m.clave_materia}
                                      </span>
                                    </td>
                                    <td>{m.creditos}</td>
                                    <td className="font-bold">
                                      {m.calificacion}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 lg:rounded-l-4xl" />
              </div>

              {/* COLUMNA 2 (Fila 1): MATERIAS ACTUALES */}
              <div className="relative lg:col-start-3 lg:row-start-1 min-w-0">
                <div className="absolute inset-px rounded-lg bg-neutral max-lg:rounded-t-4xl lg:rounded-tr-4xl" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tr-[calc(2rem+1px)] w-full">
                  <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                    <p className="mt-2 text-lg font-medium tracking-tight text-neutral-content max-lg:text-center">
                      Materias Actuales
                    </p>
                    <p className="text-sm text-neutral-content/70 max-lg:text-center mt-1">
                      Periodo: {periodoActual}
                    </p>
                  </div>

                  <div className="overflow-x-auto w-full p-4">
                    <table className="table table-zebra table-sm w-full bg-base-100 rounded-lg">
                      <tbody>
                        {materiasActuales.map((m) => (
                          <tr key={m.clave_materia}>
                            <td className="whitespace-normal text-xs sm:text-sm font-medium">
                              {m.nombre_materia}
                            </td>
                            <td className="text-right">
                              <span className="badge badge-sm badge-success">
                                {m.creditos} cr
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-t-4xl lg:rounded-tr-4xl" />
              </div>

              {/* COLUMNA 2 (Fila 2): KPIs */}
              <div className="relative lg:col-start-3 lg:row-start-2 min-w-0">
                <div className="absolute inset-px rounded-lg bg-neutral max-lg:rounded-b-4xl lg:rounded-br-4xl" />
                <div className="relative flex h-full flex-col justify-around overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)] w-full">
                  <div className="px-8 pt-6 sm:px-10">
                    <p className="text-lg font-medium tracking-tight text-neutral-content max-lg:text-center">
                      Estadísticas Generales
                    </p>
                  </div>

                  <div className="p-4 flex justify-center">
                    <div className="stats stats-vertical shadow bg-base-100 w-full border border-base-300">
                      <div className="stat text-center">
                        <div className="stat-title">Avance de Carrera</div>
                        <div className="stat-value text-primary">
                          {kpis.avance}%
                        </div>
                        <div className="stat-desc">Porcentaje completado</div>
                      </div>

                      <div className="stat text-center">
                        <div className="stat-title">Materias Ordinarias</div>
                        <div className="stat-value text-success">
                          {kpis.porcentajeNormal}%
                        </div>
                        <div className="stat-desc">
                          Cursadas en tiempo normal
                        </div>
                      </div>

                      <div className="stat text-center">
                        <div className="stat-title">Extraordinarios</div>
                        <div className="stat-value text-error">
                          {kpis.porcentajeExtra ? kpis.porcentajeExtra : 0}%
                        </div>
                        <div className="stat-desc">
                          Materias en repetición/extra
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-b-4xl lg:rounded-br-4xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Kardex;
