import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  // Carga las variables de entorno basadas en el 'mode' (development, production, etc.)
  // process.cwd() indica que busque el archivo .env en el directorio actual
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_URL, // <-- Ahora sí funcionará
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
