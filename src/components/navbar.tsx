import { HeartPulse, User} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/DropDownMenu"
import { Button } from "./ui/Button"
import { cn } from "../utils/Utils"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { useState, useEffect } from "react"
import { DecodedToken } from "./gestion-usuario/interfaces-validaciones-usuario"


function ProfileButton() {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("Token")
    navigate("/")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 bg-principal rounded-lg transition-all duration-200 hover:bg-blue-900 hover:scale-105 text-white border border-white/20 hover:border-white/40"
        >
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg rounded-lg mt-2"
      >
        <DropdownMenuItem
          className="hover:bg-slate-100 text-white dark:hover:bg-slate-700 transition-colors cursor-pointer rounded-md mx-1 my-1"
          onClick={handleLogout}
        >
          <User className="h-4 w-4 mr-2 text-white" />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface NavbarProps {
  className?: string
}


export function Navbar({ className }: NavbarProps) {
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    const userData = async () => {
      const token = localStorage.getItem("Token")
      if (!token) return

      try {
        const decodedToken: DecodedToken = jwtDecode(token)
        const usuario = decodedToken.email

        setUserEmail(usuario)
      } catch (error) {
        console.error("Error al decodificar el token:", error)
      }
    }

    userData()
  }, [])

  console.log("este es el usuario:", userEmail)

  return (
    <header className={cn("bg-slate-900 text-white sticky top-0 z-50 shadow-lg border-b border-slate-700", className)}>
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-2">
        <div className="flex items-center justify-between gap-2 sm:gap-4">

          <div className="flex items-center space-x-2 flex-shrink-0">
            <HeartPulse className="h-8 w-8 text-white" />
            <div className="hidden sm:inline">
              <h1 className="text-sm sm:text-base md:text-lg font-bold leading-tight">IMC</h1>
              <p className="text-white-300 truncate">{userEmail}</p>
            </div>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <div className="scale-75 sm:scale-90 md:scale-100">
              <ProfileButton />
            </div>
          </div>
        </div>

      </div>
    </header>
  )

}
