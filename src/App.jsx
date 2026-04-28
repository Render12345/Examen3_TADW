import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Calificaciones from "./pages/Calificaciones";
import Kardex from "./pages/Kardex";
import Horario from "./pages/Horario";
import Login from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/calificaciones" element={<Calificaciones />} />
            <Route path="/kardex" element={<Kardex />} />
            <Route path="/horario" element={<Horario />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
