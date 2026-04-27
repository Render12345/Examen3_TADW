// src/services/api.js
const BASE_URL = '/api';

export const loginApi = async (email, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Error al iniciar sesión');
  }
  
  return data;
};