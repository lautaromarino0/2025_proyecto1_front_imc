import type React from "react"
import ConsultarHistorialIMC from "../components/gestion-calcular-imc/consultar-historial-imc"


const IMCPage: React.FC = () => {


  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-100 via-white to-emerald-50 overflow-y-auto">

      <ConsultarHistorialIMC  />
        
    </div>
  )
}

export default IMCPage
