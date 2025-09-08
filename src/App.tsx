import { useState } from 'react';
import jwt_decode from 'jwt-decode';
import ImcForm from './components/ImcForm';
import ImcHistory from './components/ImcHistory';
import Login from './components/Login';
import Register from './components/Register';


const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [userId, setUserId] = useState<number | null>(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) return null;
    try {
      const decoded: any = jwt_decode(storedToken);
      return decoded.sub ? Number(decoded.sub) : null;
    } catch {
      return null;
    }
  });
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (token: string) => {
    setToken(token);
    localStorage.setItem('token', token);
    try {
      const decoded: any = jwt_decode(token);
      setUserId(decoded.sub ? Number(decoded.sub) : null);
    } catch {
      setUserId(null);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('token');
  };

  if (!token || !userId) {
    return (
      <div>
        {showRegister ? (
          <>
            <Register onRegister={() => setShowRegister(false)} />
            <button onClick={() => setShowRegister(false)}>¿Ya tienes cuenta? Inicia sesión</button>
          </>
        ) : (
          <>
            <Login onLogin={handleLogin} />
            <button onClick={() => setShowRegister(true)}>¿No tienes cuenta? Regístrate</button>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <button onClick={handleLogout}>Cerrar sesión</button>
      <h1>Calculadora de IMC</h1>
      <ImcForm />
      <h2>Historial de IMC</h2>
  <ImcHistory />
    </div>
  );
};

export default App;
