
import { useEffect, useState } from "react"
import { Clock, PlusCircle} from "lucide-react"
import { ImcHistoryItem } from "../../interfaces/ImcHistoryItem.interface"
import HistorialIMCService from "./historial-imc-service"
import { formatCantidades, formatDateISO } from "../herramientas/formateo-campos/fucion-formateo"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"
import { Button } from "../ui/Button"
import { Column, TablaAGGrid } from "../herramientas/tablas/tabla-flexible-ag-grid"
import CalcularIMC from "./calcular-imc"

export default function ConsultarHistorialIMC() {
  const [historiales, setHistoriales] = useState<ImcHistoryItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    handleBuscarHistorialesIMC()
  }, []);

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleSuccess = async () => {
    closeModal()

    setLoading(true)

    const historiales = await HistorialIMCService.getHistorialImc()

    setHistoriales(historiales)
    setLoading(false)
  }

  const handleBuscarHistorialesIMC = async () => {
    setLoading(true)

    const historiales = await HistorialIMCService.getHistorialImc()

    setHistoriales(historiales)
    setLoading(false)
  }

  const columns: Column<ImcHistoryItem>[] = [
    {
      header: "Fecha",
      accessor: "fecha",
      flex: 0.5,
      type: "text",
      editable: false,
      formatFunction: ({ value }: { value: string }) => <span>{formatDateISO(value)}</span>
      
    },
    {
      header: "Altura (m)",
      accessor: "altura",
      flex: 0.3,
      type: "text",
      align: "right",
      editable: false,
      scrollable: false,
      formatFunction: ({ value }: { value: number }) => <span>{formatCantidades(value || 0)}</span>
    },
    {
      header: "Peso (kg)",
      accessor: "peso",
      flex: 0.3,
      type: "text",
      align: "right",
      editable: false,
      scrollable: false,
      formatFunction: ({ value }: { value: number }) => <span>{formatCantidades(value || 0)}</span>
    },
    {
      header: "IMC",
      accessor: "imc",
      flex: 0.3,
      type: "text",
      align: "right",
      editable: false,
      scrollable: false,
      formatFunction: ({ value }: { value: number }) => <span>{formatCantidades(value || 0)}</span>
    },
    {
      header: "Categoría",
      accessor: "categoria",
      flex: 0.5,
      type: "text",
      editable: false,
    }
  ]

  return (
    <div className="w-full">
      
      <div className="p-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Cargando historiales...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md">
              <p className="text-red-600 dark:text-red-400 text-center font-medium">{error}</p>
            </div>
          </div>
        ) : (
          <>            

            <Card className="bg-white border-emerald-100 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between p-4 gap-4">
                <div className="flex items-center gap-6">
                  <CardTitle className="flex items-center space-x-2 text-emerald-700">
                    <Clock className="consultar-icon text-emerald-500" />
                    <span>Historial</span>
                  </CardTitle>
                </div>

                <Button
                  className="bg-emerald-500 hover:bg-emerald-600 text-white flex items-center px-4 py-2 rounded-lg shadow-md"
                  onClick={openModal}
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Calcular
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <TablaAGGrid
                    columns={columns}
                    data={historiales}
                    onUpdate={() => {}}
                    actionsFlex={0}
                    rowHeight={60}
                  />
                </div>
              </CardContent>
            </Card>

            </>
          )}
        </div>

        {/* Modales*/}
        {isModalOpen && ( 
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative p-6 sm:p-8 rounded-lg shadow-lg w-4/5 sm:w-3/5 md:w-2/3 lg:w-1/2 xl:w-2/5 max-w-full">
              <CalcularIMC onClose={handleSuccess} />
            </div>
          </div>
        )}

    </div>

    
  )
}

