import type React from "react"
import { Navbar } from "../components/navbar"


const StatsPage: React.FC = () => {


  return (
    <div className="h-screen w-full bg-gradient-to-br from-emerald-100 via-white to-emerald-50 overflow-y-auto">

      <Navbar />

      <div className="w-full max-w-8xl">
        <h1>Estadisticas</h1>
      </div>
        
    </div>
  )
}

export default StatsPage