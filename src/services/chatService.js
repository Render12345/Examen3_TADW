// src/services/chatService.js
const BASE_URL = `${import.meta.env.VITE_CHAT}/chat-server/movil/estudiante`;

// Helper para obtener los headers con el token
const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const iniciarConversacionApi = async (maestroId) => {
  const response = await fetch(`${BASE_URL}/conversaciones`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ maestro_id: maestroId }),
  });

  const data = await response.json();
  if (!response.ok)
    throw new Error(data.message || "Error al iniciar conversación");
  return data; // Debería retornar { conversacion_id: ... }
};

export const getMensajesApi = async (conversacionId) => {
  const response = await fetch(`${BASE_URL}/mensajes/${conversacionId}`, {
    method: "GET",
    headers: getHeaders(),
  });

  const data = await response.json();
  if (!response.ok)
    throw new Error(data.message || "Error al cargar el historial");
  return data; // Retorna el arreglo de mensajes
};

export const enviarMensajeApi = async (texto, conversacionId) => {
  const response = await fetch(`${BASE_URL}/mensajes/${conversacionId}`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      texto: texto,
      //   conversacion_id: conversacionId, // Dependiendo de tu backend, esto podría ir en la URL
    }),
  });

  const data = await response.json();
  if (!response.ok)
    throw new Error(data.message || "Error al enviar el mensaje");
  return data;
};
