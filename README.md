# Proyecto rediseño SII

Aplicación web que consume los servicios REST del sistema SII ITC, permitiendo al usuario autenticarse y visualizar su
información académica de manera dinámica y estructurada.

## Galeria

Login
![Login](src\assets\readme\login.png)

Home
![Home](src\assets\readme\home.png)
![Home](src\assets\readme\home_mobile.png)

Calificaciones
![Calificaciones](src\assets\readme\cal1.png)
![Calificaciones](src\assets\readme\cal2.png)

Chat (distintos temas)
![Chat](src\assets\readme\ch1.png)
![Chat](src\assets\readme\ch2.png)
![Chat](src\assets\readme\ch3.png)

Kardex
![Kardex](src\assets\readme\kardex1.png)
![Kardex](src\assets\readme\kardex2.png)

Horario
![Horario](src\assets\readme\horario_skeleton.png)
![Horario](src\assets\readme\horario1.png)
![Horario](src\assets\readme\horario2.png)

## 🚀 Sobre el Framework y Herramientas

### React

React es una biblioteca de JavaScript de código abierto diseñada para crear interfaces de usuario basadas en componentes. Su enfoque declarativo y el uso del **Virtual DOM** permiten actualizaciones eficientes y un flujo de datos predecible, lo que facilita el desarrollo de aplicaciones web complejas y escalables.

### Vite

Vite (palabra en francés para "rápido") es la nueva generación de herramientas de desarrollo para frontend. A diferencia de herramientas tradicionales como Create React App:

- **Arranque instantáneo:** Utiliza módulos ES nativos en el navegador para no tener que empaquetar todo el código antes de empezar.
- **HMR (Hot Module Replacement) ultra rápido:** Las actualizaciones de código se reflejan en el navegador casi al instante, sin importar el tamaño del proyecto.
- **Optimización en producción:** Utiliza Rollup para generar un bundle altamente optimizado.

## 🛠️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión 18.0 o superior recomendada)
- Un gestor de paquetes: **npm**, **yarn** o **pnpm**.

## ⚙️ Instalación

Sigue estos pasos para configurar el proyecto localmente:

1. **Clonar el repositorio:**

   ```bash
   git clone [https://github.com/tu-usuario/nombre-del-proyecto.git](https://github.com/tu-usuario/nombre-del-proyecto.git)
   cd nombre-del-proyecto

   ```

2. **Instalar dependencias** <br>
   Si usas npm:
   ```bash
   npm install
   ```
   Si usas yarn:
   ```bash
   npm install
   ```

## 🚀 Ejecución del Proyecto

Una vez instaladas las dependencias, puedes iniciar el servidor de desarrollo: <Br>
Si usas npm:

```
npm run dev
```

Si usas yarn:

```
npm run dev
```

El servidor se ejecutará normalmente en http://localhost:5173. Abre esa dirección en tu navegador para ver la aplicación.

## 🏗️ Construcción para Producción

Para generar una versión optimizada para despliegue:

```
npm run build
```

Esto creará una carpeta dist/ con los archivos estáticos listos para ser subidos a cualquier servicio de hosting (Netlify, Vercel, Firebase, etc.).

**Previsualizar la versión de producción localmente:**

```
npm run preview
```
