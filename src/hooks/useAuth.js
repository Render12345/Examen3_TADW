// src/hooks/useAuth.js
import { useState } from 'react';
import { loginApi } from '../services/api';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginApi(email, password);
      localStorage.setItem('token', data.message.login.token);
      return true; // Éxito
    } catch (err) {
      setError(err.message);
      return false; // Error
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    // Si en el futuro usas un Contexto de Auth, aquí pondrías el setUser(null)
  };

  return { login, loading, error, logout };
};