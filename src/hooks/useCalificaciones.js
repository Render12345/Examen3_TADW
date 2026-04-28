// src/hooks/useCalificaciones.js
import { useState, useEffect } from "react";
import { getCalificacionesApi } from "../services/calificacionesService";

export const useCalificaciones = () => {
  const [calificaciones, setCalificaciones] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCalificaciones = async () => {
      try {
        const data = await getCalificacionesApi();
        setCalificaciones(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCalificaciones();
  }, []);

  return { calificaciones, loading, error };
};