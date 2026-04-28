// src/hooks/useHorario.js
import { useState, useEffect } from "react";

// 👇 Ahora importamos desde el nuevo archivo
import { getHorarioApi } from "../services/horarioService";

export const useHorario = () => {
  // ... el resto del código del hook se mantiene exactamente igual ...
  const [horario, setHorario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHorario = async () => {
      try {
        const data = await getHorarioApi();
        setHorario(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHorario();
  }, []);

  return { horario, loading, error };
};
