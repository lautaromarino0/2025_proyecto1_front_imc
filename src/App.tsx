import { useState } from 'react';
import { AuthProvider, useAuth } from './service/AuthService';
import Login from './components/Login';
import Register from './components/Register';
import ImcContainer from './components/ImcContainer';

const AppContent: React.FC = () => {
  const { token, userId, login, logout } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

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
            <Login onLogin={login} />
            <button onClick={() => setShowRegister(true)}>¿No tienes cuenta? Regístrate</button>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <button onClick={logout}>Cerrar sesión</button>
      <ImcContainer/>
    </div>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <AppContent/>
  </AuthProvider>
);

export default App;
