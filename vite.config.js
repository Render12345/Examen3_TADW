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
        "/chat-server": {
          target: env.VITE_CHAT,
          changeOrigin: true,
          secure: false,
          // Si el servidor de chat espera recibir "/api/...",
          // reescribimos "/chat-server" por "/api"
          rewrite: (path) => path.replace(/^\/chat-server/, "/api"),
        },
        // 2. Regla general para el resto de la API
        "/api": {
          target: env.VITE_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
