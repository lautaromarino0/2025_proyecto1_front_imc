import { useState } from "react";
import { useForm, FormProvider} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Label } from "../ui/Label";
import { Button } from "../ui/Button";
import { Eye, EyeOff } from "lucide-react";
import { FormValuesRegister, registerSchema } from "./interfaces-validaciones-usuario";
import { parseApiError } from "../../utils/errores";
import FormInput from "../herramientas/formateo-campos/form-input";
import UsuarioService from "./usuario-service";



export default function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  
  const methods = useForm<FormValuesRegister>({
    resolver: yupResolver(registerSchema),
    defaultValues: { email: "", password: ""},
  })

  const { handleSubmit, formState: { isSubmitting, errors } , watch, setError, register } = methods;

  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const password = watch("password");


  const onSubmit = async (formData: FormValuesRegister) => {
    if (password !== confirmPassword) {
      setError("root", {
        type: "manual",
        message: "Las contraseñas no coinciden.",
      });
      return;
    }

    try {

      const payload = { 
        ...formData
      };

      await UsuarioService.register(payload)
      
      if (onSuccess) onSuccess();
    } catch (error) {

      const errorMessage = parseApiError(error);

      setError("root", {
        type: "manual",
        message: errorMessage,
      });
    }
  }
  
return (
  <div className="w-full">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div className="space-y-3">
            <FormInput name="email" label="Correo Electrónico" placeholder="tu@ejemplo.com" className="text-sm" />

            <div className="relative">

              <Label htmlFor={"password"} className="text-sm font-medium text-gray-700 block mb-1">
                Constraseña
              </Label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="w-full text-black bg-gray-100 px-3 py-2 pr-10 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-emerald-500 focus:border-emerald-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute h-2 top-1/1 mt-3 right-3  p-0 m-0 bg-transparent border-none text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showPassword
                  ? <EyeOff size={16} className="text-emerald-500" />
                  : <Eye size={16} className="text-emerald-500" />
                }
              </button>

              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 block mb-1 mt-3">
                Confirmar Contraseña
              </Label>
              <input
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full text-black bg-gray-100 px-3 py-2 pr-10 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute h-2 top-1/1 mt-3 right-3  p-0 m-0 bg-transparent border-none text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showPassword
                  ? <EyeOff size={16} className="text-emerald-500" />
                  : <Eye size={16} className="text-emerald-500" />
                }
              </button>
            </div>
            
          </div>

          {errors.root?.message && (
            <div className="text-red-600 text-center mb-4">
              {String(errors.root.message)}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-700 hover:bg-emerald-500 text-white text-sm py-2.5 rounded-lg font-medium transition-colors"
          >
            {isSubmitting ? "Registrandote..." : "Registrarse"}
          </Button>

        </form>
      </FormProvider>

      
    </div>
  )
}  

