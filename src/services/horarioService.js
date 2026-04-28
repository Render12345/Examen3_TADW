// src/services/horarioService.js

// Nota: Podrías llevar este BASE_URL a un archivo de configuración global
// para no repetirlo en cada archivo de servicio.
const BASE_URL = "/api/movil/estudiante";

export const getHorarioApi = async () => {
  // 1. Obtenemos el token
  const token = localStorage.getItem("token");

  // 2. Hacemos la petición
  const response = await fetch(`${BASE_URL}/horarios`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Agregamos el token para que el backend sepa quién hace la petición
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al obtener el horario");
  }

  return data;
};

// En el futuro, si necesitas agregar un horario, lo pones aquí mismo:
// export const createHorarioApi = async (nuevoHorario) => { ... }
