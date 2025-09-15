import type React from "react"
import ConsultarHistorialIMC from "../components/gestion-calcular-imc/consultar-historial-imc"
import { Navbar } from "../components/navbar"


const IMCPage: React.FC = () => {


  return (
    <div className="h-screen w-full bg-gradient-to-br from-emerald-100 via-white to-emerald-50 overflow-y-auto">

      <Navbar />

      <div className="w-full max-w-8xl">
      <ConsultarHistorialIMC  />
      </div>
        
    </div>
  )
}

export default IMCPage
