// src/hooks/useChat.js
import { useState, useCallback } from "react";
import {
  iniciarConversacionApi,
  getMensajesApi,
  enviarMensajeApi,
} from "../services/chatService";

export const useChat = () => {
  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conversacionId, setConversacionId] = useState(null);

  const cargarConversacion = useCallback(async (maestroId) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Obtener o crear la conversación
      const convData = await iniciarConversacionApi(maestroId);
      const idConv = convData.conversacion_id || convData.id;
      setConversacionId(idConv);

      // 2. Obtener el historial de mensajes
      const historial = await getMensajesApi(idConv);
      setMensajes(historial);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const enviarMensaje = async (texto) => {
    if (!conversacionId) return;

    // Optimistic UI: Podemos agregar el mensaje temporalmente mientras se envía
    const nuevoMsg = {
      id: Date.now(),
      sender_type: "estudiante",
      texto: texto,
      hora: "Enviando...",
    };
    setMensajes((prev) => [...prev, nuevoMsg]);

    try {
      await enviarMensajeApi(texto, conversacionId);
      // Recargamos el historial real tras enviar
      const historialActualizado = await getMensajesApi(conversacionId);
      setMensajes(historialActualizado);
    } catch (err) {
      setError(err.message);
      // Podrías revertir el Optimistic UI aquí en caso de error
    }
  };

  return {
    mensajes,
    loading,
    error,
    cargarConversacion,
    enviarMensaje,
    setMensajes,
  };
};
