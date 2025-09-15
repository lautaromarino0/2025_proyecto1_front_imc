
import { useForm, FormProvider} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Tag } from "lucide-react";
import { FormValuesImc, schemaImc } from "./interfaces-validaciones-imc";
import HistorialIMCService from "./historial-imc-service";
import { parseApiError } from "../../utils/errores";
import { Card, CardContent, CardFooter } from "../ui/Card";
import { Button } from "../ui/Button";
import { useState } from "react";
import KgInput from "../herramientas/formateo-campos/kg-input";
import AlturaInput from "../herramientas/formateo-campos/altura-input";



export default function CalcularIMC({ onClose }: { onClose: () => void;}) {

  const [resultado, setResultado] = useState<{ imc: number; categoria: string } | null>(null);
  
  const methods = useForm<FormValuesImc>({
    resolver: yupResolver(schemaImc),
  });

  const { handleSubmit, formState: { isSubmitting, errors }, setValue, watch, setError } = methods;
  

  const altura = watch("altura");
  const peso = watch("peso");

  const onSubmit = async (formData: FormValuesImc) => {

    try {

      const payload = {
          ...formData,
      };

      const resultado = await HistorialIMCService.calcularImc(payload);

      setResultado(resultado);

    } catch (error) {        
      const errorMessage = parseApiError(error);

      setError("root", {
        type: "manual",
        message: errorMessage,
      });
    
    }
  };

return (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 p-4">
    <Card className="w-full max-w-2xl bg-white border border-emerald-100 shadow-2xl rounded-2xl overflow-hidden transform transition-all duration-300 ease-in-out">

      <div className="relative p-6 border-b border-emerald-100 text-center">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors"
        >
          &times;
        </button>

        <div className="flex justify-center mb-4">
          <div className="bg-emerald-500 p-3 rounded-full shadow-md">
            <Tag className="h-6 w-6 text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-emerald-700 mb-1">Calcular IMC</h2>
        <p className="text-sm text-gray-500">Ingresa tus datos para calcular tu índice de masa corporal.</p>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>

          <CardContent className="space-y-4 px-6 py-4">

            <div className="flex gap-4 items-end">
              <AlturaInput 
                name="altura" 
                label="Altura"
                value={altura || 0} 
                onChange={(value) => setValue("altura", Number(value))}
              />

              <KgInput 
                name="peso" 
                label="Peso"
                value={peso || 0} 
                onChange={(value) => setValue("peso", Number(value))}
              />
            </div>

            {resultado && (
              <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-center shadow-sm">
                <p className="text-lg font-semibold text-emerald-700">
                  Tu IMC: {resultado.imc.toFixed(2)}
                </p>
                <p className="text-gray-600">Categoría: <span className="font-medium">{resultado.categoria}</span></p>
              </div>
            )}
          </CardContent>

          {errors.root?.message && (
            <div className="text-red-600 text-center mb-4 font-medium">
              {String(errors.root.message)}
            </div>
          )}

          {!resultado && (
          <CardFooter className="flex justify-center p-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6 py-2 rounded-lg shadow-md"
            >
              {isSubmitting ? "Calculando..." : "Calcular"}
            </Button>
          </CardFooter>
          )}
        </form>
      </FormProvider>
    </Card>
  </div>
);
};

  
