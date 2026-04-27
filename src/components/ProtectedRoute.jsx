// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";

// Verificar que tiene token (proteccion de rutas)

export const ProtectedRoute = () => {
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // Renderiza las rutas hijas
};
