// src/utils/calificacionesUtils.js

export const getBadgeColor = (cal) => {
  if (cal === null || cal === undefined) return "badge-ghost";
  const n = parseFloat(cal);
  if (n >= 90) return "badge-success";
  if (n >= 70) return "badge-warning";
  return "badge-error";
};

export const getEstado = (cal) => {
  if (cal === null || cal === undefined)
    return { label: "Pendiente", color: "badge-ghost" };
  const n = parseFloat(cal);
  if (n >= 90) return { label: "Excelente", color: "badge-success" };
  if (n >= 70) return { label: "Aprobado", color: "badge-warning" };
  return { label: "Reprobado", color: "badge-error" };
};

export const calcularPromedio = (califs) => {
  const registradas = califs.filter((c) => c.calificacion !== null);
  if (registradas.length === 0) return null;
  const suma = registradas.reduce((acc, c) => acc + parseFloat(c.calificacion), 0);
  return (suma / registradas.length).toFixed(1);
};

export const calcularKpis = (materias) => {
  const conCalif = materias.filter((m) =>
    m.calificaiones.some((c) => c.calificacion !== null)
  );

  const promedios = conCalif
    .map((m) => calcularPromedio(m.calificaiones))
    .filter(Boolean)
    .map(Number);

  const promGeneral =
    promedios.length > 0
      ? (promedios.reduce((a, b) => a + b, 0) / promedios.length).toFixed(1)
      : "—";

  return {
    promGeneral,
    aprobadas: promedios.filter((p) => p >= 70).length,
    reprobadas: promedios.filter((p) => p < 70).length,
    total: materias.length,
  };
};