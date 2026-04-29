// src/services/calificacionesService.js
const BASE_URL = `${import.meta.env.VITE_URL}/api/movil/estudiante`;

export const getCalificacionesApi = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/calificaciones`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al obtener las calificaciones");
  }

  return data;
};