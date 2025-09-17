import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import AuthPage from './pages/auth-page';
import IMCPage from './pages/imc-page';
import StatsPage from './pages/stats-page';


function App() {

  return (
    <Router>
      <Routes>

        <Route path="/" element={<AuthPage/>} />
        <Route path="/calcular-imc" element={<IMCPage/>} />
        <Route path="/estadisticas" element={<StatsPage/>} />
      
      </Routes>
    </Router>
  )
}

export default App
