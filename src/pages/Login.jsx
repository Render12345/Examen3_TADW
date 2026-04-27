import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <form onSubmit={handleLogin} className="w-full max-w-sm p-8 border border-[var(--border)] rounded-xl shadow-[var(--shadow)] bg-[var(--bg)]">
        <h2 className="mb-6">Iniciar Sesión</h2>
        
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-[var(--code-bg)] border border-[var(--border)] rounded-md text-[var(--text)] outline-none focus:border-[var(--accent)]"
        />
        
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 bg-[var(--code-bg)] border border-[var(--border)] rounded-md text-[var(--text)] outline-none focus:border-[var(--accent)]"
        />

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-3 bg-[var(--accent)] text-white font-bold rounded-md hover:opacity-90 transition-opacity"
        >
          {loading ? 'Cargando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default Login;