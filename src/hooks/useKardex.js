// src/hooks/usekardex.js
import { useState, useEffect } from "react";

// 👇 Ahora importamos desde el nuevo archivo
import { getKardexApi } from "../services/kardexService";

export const useKardex = () => {
  // ... el resto del código del hook se mantiene exactamente igual ...
  const [kardex, setkardex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchkardex = async () => {
      try {
        const data = await getKardexApi();
        setkardex(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchkardex();
  }, []);

  return { kardex, loading, error };
};
