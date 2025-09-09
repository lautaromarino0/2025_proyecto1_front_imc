import { useContext } from "react"
import { ImcContext } from "./ImcProvider"

function ImcResult() {

  const context = useContext(ImcContext)
  if (!context) {
    throw new Error("ImcResult debe estar dentro de un ImcProvider")
  }
  const { resultado, error } = context;


  return (
    <div>
      <h2>Resultado del IMC</h2>
      {error ? (
        <div style={{ color: 'red', margin: '10px 0' }}>
          <strong>Error:</strong> {error}
        </div>
      ) : resultado ? (
        <div style={{ margin: '10px 0' }}>
          <p><strong>IMC:</strong> {resultado.imc}</p>
          <p><strong>Clasificación:</strong> {resultado.categoria}</p>
        </div>
      ) : (
        <p>No hay resultado para mostrar.</p>
      )}
    </div>
  )
}

export default ImcResult