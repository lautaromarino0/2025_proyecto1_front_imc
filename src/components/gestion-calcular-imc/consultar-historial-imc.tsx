
import { useEffect, useState } from "react"
import { HeartPulse, PlusCircle, Tag} from "lucide-react"
import { ImcHistoryItem } from "../../interfaces/ImcHistoryItem.interface"
import HistorialIMCService from "./historial-imc-service"
import { formatCantidades, formatDate } from "../herramientas/formateo-campos/fucion-formateo"
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
      formatFunction: ({ value }: { value: string }) => <span>{formatDate(value)}</span>
      
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
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-emerald-100 via-white to-emerald-50">
      <div className="w-full max-w-8xl p-6">
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-emerald-100">

          {/* Ícono superior */}
          <div className="flex justify-center mb-6">
            <div className="bg-emerald-500 p-3 rounded-full shadow-md">
              <HeartPulse className="h-8 w-8 text-white" />
            </div>
          </div>

          {/* Título */}
          <h1 className="text-2xl font-bold text-center text-emerald-700 mb-2">
            Historial de IMC
          </h1>
          <p className="text-center text-gray-500 text-sm mb-6">
            Consulta y gestiona tus registros de índice de masa corporal.
          </p>

          {/* Contenido */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400 text-lg">Cargando historiales...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md">
                <p className="text-red-600 dark:text-red-400 text-center font-medium">{error}</p>
              </div>
            </div>
          ) : (
            <Card className="border-emerald-100 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between p-4 gap-4">
                <div className="flex items-center gap-6">
                  <CardTitle className="flex items-center space-x-2 text-emerald-700">
                    <Tag className="consultar-icon text-emerald-500" />
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
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          &copy; 2025 Sistema IMC. Vive saludable 🌱
        </p>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-emerald-100">
            <div className="p-6">
              <CalcularIMC onClose={handleSuccess} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
