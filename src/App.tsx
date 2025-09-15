import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import AuthPage from './pages/auth-page';
import IMCPage from './pages/imc-page';


function App() {

  return (
    <Router>
      <Routes>

        <Route path="/" element={<AuthPage/>} />
        <Route path="/calcular-imc" element={<IMCPage/>} />
      
      </Routes>
    </Router>
  )
}

export default App
