import React, { useContext, useState } from "react";
import { calcularImc } from "../service/ImcService";
import { ImcContext } from "./ImcProvider";

function ImcForm() {

  const context = useContext(ImcContext);
  if (!context) {
    throw new Error("ImcForm must be used within an ImcProvider");
  }

  const { setResultado, setError } = context;

  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const alturaNum = parseFloat(altura);
    const pesoNum = parseFloat(peso);

    if (isNaN(alturaNum) || isNaN(pesoNum) || alturaNum <= 0 || pesoNum <= 0) {
      setError("Por favor, ingresa valores válidos (positivos y numéricos).");
      setResultado(null);
      return;
    }
    else if (alturaNum >= 3 || pesoNum >= 500) {
      setError("Por favor, ingresa valores válidos: Altura max 3m Peso max 500kg.");
      setResultado(null);
      return;
    }

    try {
      const response = await calcularImc(alturaNum, pesoNum);
      setResultado({imc: response.data.imc, categoria: response.data.categoria});
      setError("");
    } catch (err) {
      setError(
        "Error al calcular el IMC. Verifica si el backend está corriendo."
      );
      setResultado(null);
    }
  };

  return (
    <div>
      <div>
        <h1>Calculadora de IMC</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Altura (m):</label>
            <input
              type="number"
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
              step="0.01"
              min="0.1"
            />
          </div>
          <div>
            <label>Peso (kg):</label>
            <input
              type="number"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              min="1"
            />
          </div>
          <button type="submit">Calcular</button>
        </form>
      </div>
    </div>
  );
}

export default ImcForm;