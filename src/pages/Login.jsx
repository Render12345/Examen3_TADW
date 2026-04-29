import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate("/");
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{
        backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/TecNM_en_Celaya.jpg/1280px-TecNM_en_Celaya.jpg')`,
      }}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

      {/* Contenedor principal que agrupa Logo, Título y Tarjeta */}
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
        {/* --- NUEVA SECCIÓN: LOGO Y TÍTULO --- */}
        <div className="flex flex-col items-center mb-8 animate-fadeIn">
          <img
            src="https://i0.wp.com/celaya.tecnm.mx/wp-content/uploads/2021/06/4104919116121984975228916236logo-tecno-nuevo-R-04.png?w=956&ssl=1"
            alt="Logo TecNM"
            className="h-24 w-auto drop-shadow-lg mb-4"
          />
          <h1 className="text-3xl font-bold text-white text-center tracking-wide uppercase">
            Sistema Integral de Información
          </h1>
          <div className="h-1 w-20 bg-primary mt-2 rounded-full"></div>{" "}
          {/* Línea decorativa */}
        </div>
        {/* ------------------------------------ */}

        {/* Contenedor del borde animado */}
        <div className="w-full p-[2px] rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent shadow-2xl">
          {/* Tarjeta de DaisyUI */}
          <div className="card w-full bg-base-100 rounded-2xl">
            <div className="card-body">
              <h2 className="card-title justify-center text-xl font-semibold mb-4 text-base-content">
                Acceso al Sistema
              </h2>

              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <div className="alert alert-error p-3 rounded-lg text-sm text-white shadow-sm">
                    <span>{error}</span>
                  </div>
                )}

                <div className="form-control">
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered w-full focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                <div className="form-control">
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered w-full focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                <div className="form-control mt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full text-white"
                  >
                    {loading ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      "Entrar"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
