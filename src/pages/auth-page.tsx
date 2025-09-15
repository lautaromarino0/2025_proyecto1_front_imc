import React from "react"
import { useEffect } from "react"
import { User, Lock, HeartPulse } from "lucide-react"
import AuthForm from "../components/gestion-usuario/auth-form"
import RegisterForm from "../components/gestion-usuario/register-form"

const AuthPage: React.FC = () => {
  const [registrado, setRegistrado] = React.useState(true);

  useEffect(() => {
    localStorage.removeItem("Token")
  }, [])

  const handleLoginSuccess = () => {
    window.location.href = "/calcular-imc";
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-100 via-white to-emerald-50 overflow-y-auto">
      <div className="w-full max-w-md p-6">

        <div className="bg-white shadow-xl rounded-2xl p-8 border border-emerald-100">

          <div className="flex justify-center mb-6">
            <div className="bg-emerald-500 p-3 rounded-full shadow-md">
              <HeartPulse className="h-8 w-8 text-white" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center text-emerald-700 mb-2">
            Bienvenido al Sistema IMC
          </h1>
          <p className="text-center text-gray-500 text-sm mb-6">
            Ingresa tus credenciales para calcular y gestionar tu índice de masa corporal.
          </p>

          { registrado ? 
            <>
              <AuthForm onSuccess={handleLoginSuccess}/> 
              <div className="mt-6 bg-emerlad-500 text-xs text-gray-400 flex justify-center space-x-4">
                <button className="bg-emerald-900 text-white" onClick={() => setRegistrado(false)}>¿No tienes cuenta? Regístrate</button>
              </div>
            </>
          :
            <>
              <RegisterForm onSuccess={() => setRegistrado(true)}/>
              <div className="mt-6 bg-emerlad-500 text-xs text-gray-400 flex justify-center space-x-4">
                <button className="bg-emerald-900 text-white" onClick={() => setRegistrado(true)}>¿Ya tienes cuenta? Inicia sesión</button>
              </div>
            </>
          }
          
        

          <div className="mt-6 text-xs text-gray-400 flex justify-center space-x-4">
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>Seguro</span>
            </div>
            <div className="flex items-center space-x-1">
              <Lock className="h-3 w-3" />
              <span>Protegido</span>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          &copy; 2025 Sistema IMC. Vive saludable 🌱
        </p>
      </div>
    </div>
  )
}

export default AuthPage
