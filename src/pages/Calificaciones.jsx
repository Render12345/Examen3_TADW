// src/pages/Calificaciones.jsx
import { useState, useMemo, useRef } from "react";
import Layout from "../components/Layout";
import { useCalificaciones } from "../hooks/useCalificaciones";
import {
  getBadgeColor,
  getEstado,
  calcularPromedio,
  calcularKpis,
} from "../utils/calificacionesUtils";
import Modal from "../components/Modal";

function Calificaciones() {
  const modalRef = useRef();
  const { calificaciones, loading, error } = useCalificaciones();
  const [busqueda, setBusqueda] = useState("");

  // Antes: const [materiaSeleccionada, setMateriaSeleccionada] = useState("");
  const [materiaSeleccionada, setMateriaSeleccionada] = useState({
    nombre: "",
    maestroId: null,
  });

  const periodoInfo = calificaciones?.data?.[0]?.periodo;
  const materias = calificaciones?.data?.[0]?.materias || [];

  const materiasFiltradas = useMemo(() => {
    if (!busqueda.trim()) return materias;
    return materias.filter((m) =>
      m.materia.nombre_materia.toLowerCase().includes(busqueda.toLowerCase()),
    );
  }, [materias, busqueda]);

  const kpis = useMemo(() => calcularKpis(materias), [materias]);

  if (loading) {
    return (
      <Layout>
        <div className="text-center p-4 animate-pulse">
          <div className="skeleton h-8 w-64 mx-auto mt-8 mb-12"></div>
          <div className="mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="skeleton h-24 w-full rounded-xl"></div>
              ))}
            </div>
            <div className="skeleton h-10 w-full mb-4 rounded-xl"></div>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="skeleton h-16 w-full rounded-xl mb-3"
              ></div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="p-8 text-center text-red-500">
          Error al cargar calificaciones: {error}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-accent mt-4">
            Calificaciones
          </h1>
          {periodoInfo && (
            <p className="text-sm text-base-content/60 mt-1">
              {periodoInfo.descripcion_periodo}
            </p>
          )}
        </div>

        <div className="stats stats-vertical lg:stats-horizontal shadow w-full bg-base-100">
          <div className="stat text-center">
            <div className="stat-title">Materias</div>
            <div className="stat-value text-primary">{kpis.total}</div>
            <div className="stat-desc">En este periodo</div>
          </div>
          <div className="stat text-center">
            <div className="stat-title">Promedio general</div>
            <div className="stat-value">{kpis.promGeneral}</div>
            <div className="stat-desc">Calificaciones registradas</div>
          </div>
          <div className="stat text-center">
            <div className="stat-title">Aprobadas</div>
            <div className="stat-value text-success">{kpis.aprobadas}</div>
            <div className="stat-desc">≥ 70</div>
          </div>
          <div className="stat text-center">
            <div className="stat-title">Reprobadas</div>
            <div className="stat-value text-error">{kpis.reprobadas}</div>
            <div className="stat-desc">&lt; 70</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Buscar materia..."
            className="input input-bordered w-full"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          {busqueda && (
            <button className="btn btn-ghost" onClick={() => setBusqueda("")}>
              ✕
            </button>
          )}
        </div>

        <div className="relative min-w-0">
          <div className="absolute inset-px rounded-lg bg-neutral lg:rounded-4xl" />
          <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-[calc(2rem+1px)] w-full">
            <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10">
              <p className="mt-2 text-lg font-medium tracking-tight text-neutral-content">
                Detalle por Materia
              </p>
              <p className="text-sm text-neutral-content/60 mt-1">
                {materiasFiltradas.length} materia
                {materiasFiltradas.length !== 1 ? "s" : ""} encontrada
                {materiasFiltradas.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="p-4 sm:p-8 overflow-x-auto w-full">
              {materiasFiltradas.length === 0 ? (
                <div className="text-center py-10 text-neutral-content/50">
                  No se encontraron materias con ese nombre.
                </div>
              ) : (
                <table className="table w-full text-center min-w-[640px]">
                  <thead>
                    <tr className="text-neutral-content/70">
                      <th className="text-left">Materia</th>
                      <th>Clave</th>
                      <th>P1</th>
                      <th>P2</th>
                      <th>P3</th>
                      <th>P4</th>
                      <th>Promedio</th>
                      <th>Estado</th>
                      <th>Chat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materiasFiltradas.map(
                      ({ materia, calificaiones }, index) => {
                        const promedio = calcularPromedio(calificaiones);
                        const estado = getEstado(promedio);
                        return (
                          <tr
                            key={materia.id_grupo}
                            className="hover:bg-black/10"
                          >
                            <td className="text-left text-neutral-content font-medium whitespace-normal min-w-[180px]">
                              {materia.nombre_materia}
                            </td>
                            <td>
                              <span className="badge badge-outline text-neutral-content badge-sm">
                                {materia.clave_materia}
                              </span>
                            </td>

                            {/* Reemplaza el calificaiones.map por esto: */}
                            {[0, 1, 2, 3].map((index) => {
                              // Buscamos si existe una calificación en esa posición
                              const c = calificaiones[index];

                              return (
                                <td key={index}>
                                  {c && c.calificacion !== null ? (
                                    <span
                                      className={`badge badge-sm ${getBadgeColor(c.calificacion)}`}
                                    >
                                      {c.calificacion}
                                    </span>
                                  ) : (
                                    <span className="text-neutral-content/30">
                                      —
                                    </span>
                                  )}
                                </td>
                              );
                            })}
                            <td className="font-bold">
                              {promedio !== null ? (
                                <span
                                  className={`badge ${getBadgeColor(promedio)}`}
                                >
                                  {promedio}
                                </span>
                              ) : (
                                <span className="text-neutral-content/30">
                                  —
                                </span>
                              )}
                            </td>
                            <td>
                              <span
                                className={`badge badge-sm ${estado.color}`}
                              >
                                {estado.label}
                              </span>
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-outline btn-info"
                                onClick={() => {
                                  setMateriaSeleccionada({
                                    nombre: materia.nombre_materia,
                                    maestroId: index + 1,
                                  });
                                  modalRef.current.open();
                                }}
                              >
                                💬 Chat
                              </button>
                            </td>
                          </tr>
                        );
                      },
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 lg:rounded-4xl" />
        </div>

        <div className="flex flex-wrap gap-3 justify-end text-sm text-base-content/60">
          <span className="flex items-center gap-1">
            <span className="badge badge-success badge-sm">90-100</span>{" "}
            Excelente
          </span>
          <span className="flex items-center gap-1">
            <span className="badge badge-warning badge-sm">70-89</span> Aprobado
          </span>
          <span className="flex items-center gap-1">
            <span className="badge badge-error badge-sm">&lt;70</span> Reprobado
          </span>
          <span className="flex items-center gap-1">
            <span className="badge badge-ghost badge-sm">—</span> Pendiente
          </span>
        </div>
      </div>
      <Modal ref={modalRef} materiaSeleccionada={materiaSeleccionada} />
    </Layout>
  );
}

export default Calificaciones;
