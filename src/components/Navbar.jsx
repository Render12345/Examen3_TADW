import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar(params) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const items = [
    { name: "Mi información", route: "/" },
    { name: "Calificaciones", route: "/calificaciones" },
    { name: "Kardex", route: "/kardex" },
    { name: "Horario", route: "/horario" },
  ];

  return (
    <div className="drawer">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* 1. CONTENIDO PRINCIPAL */}
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-100 shadow-sm w-full">
          {/* START: Menú hamburguesa (Móvil) + Título (Desktop) */}
          <div className="navbar-start">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-2"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            {/* Título en Desktop (oculto en móvil) */}
            <a className="btn btn-ghost text-3xl hidden lg:flex">Nuevo SII</a>
          </div>

          {/* CENTER: Título (Móvil) + Menú horizontal (Desktop) */}
          <div className="navbar-end">
            {/* Título en Móvil (oculto en desktop) */}
            <a className="btn btn-ghost text-2xl lg:hidden">Nuevo SII</a>

            {/* Menú en Desktop (oculto en móvil) */}
            <div className="hidden flex-none lg:block">
              <ul className="menu menu-horizontal p-0">
                {" "}
                {/* Añadimos p-0 para alinear perfectamente */}
                {/* 1. Items estáticos */}
                {items.map((item, index) => (
                  <li key={index}>
                    <a className="hover:bg-base-300 text-lg" href={item.route}>
                      {item.name}
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:bg-red-50 text-lg"
                  >
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* END: Iconos */}
          <div className="navbar-end">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn m-1">
                Theme
                <svg
                  width="12px"
                  height="12px"
                  className="inline-block h-2 w-2 fill-current opacity-60"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 2048 2048"
                >
                  <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl"
              >
                <li>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                    aria-label="Default"
                    value="default"
                  />
                </li>
                <li>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                    aria-label="Lemonade"
                    value="lemonade"
                  />
                </li>
                <li>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                    aria-label="Synthwave"
                    value="synthwave"
                  />
                </li>
                <li>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                    aria-label="Retro"
                    value="retro"
                  />
                </li>
                <li>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                    aria-label="Cyberpunk"
                    value="cyberpunk"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SIDEBAR: Extraído del navbar para que funcione correctamente el overlay */}
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* {items.map((item, index) => (
            <li key={index}>
              <a className="text-lg">{item.name}</a>
            </li>
          ))} */}{" "}
          {/* Añadimos p-0 para alinear perfectamente */}
          {/* 1. Items estáticos */}
          {items.map((item, index) => (
            <li key={index}>
              <a className="hover:bg-base-300 text-lg" href={item.route}>
                {item.name}
              </a>
            </li>
          ))}
          <li className="mt-auto">
            <button
              onClick={handleLogout}
              className="text-red-500 hover:bg-red-50 text-lg font-bold"
            >
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
