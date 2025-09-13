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

    const errores: string[] = [];
    // Validación estricta de número: solo dígitos, opcional punto y decimales
    const numeroValido = /^\d*\.?\d+$/;

    if (!numeroValido.test(peso)) {
      errores.push(
        "Por favor, ingresa valores válidos (numéricos) para el peso."
      );
    }
    if (!numeroValido.test(altura)) {
      errores.push(
        "Por favor, ingresa valores válidos (numéricos) para la altura."
      );
    }

    const alturaNum = parseFloat(altura);
    const pesoNum = parseFloat(peso);

    if (numeroValido.test(altura) && alturaNum <= 0) {
      errores.push("La altura debe ser un número positivo mayor a 0 metros.");
    }
    if (numeroValido.test(peso) && pesoNum <= 0) {
      errores.push("El peso debe ser un número positivo mayor a 0 kg.");
    }
    if (numeroValido.test(altura) && alturaNum >= 3) {
      errores.push("Por favor, ingresa valores válidos: altura máxima 3 m.");
    }
    if (numeroValido.test(peso) && pesoNum >= 500) {
      errores.push("Por favor, ingresa valores válidos: peso máximo 500 kg.");
    }

    if (errores.length > 0) {
      setError(errores.join("\n"));
      setResultado(null);
      return;
    }

    try {
      const response = await calcularImc(alturaNum, pesoNum);
      setResultado({
        imc: response.data.imc,
        categoria: response.data.categoria,
      });
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
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
              step="0.01"
            />
          </div>
          <div>
            <label>Peso (kg):</label>
            <input value={peso} onChange={(e) => setPeso(e.target.value)} />
          </div>
          <button type="submit">Calcular</button>
        </form>
      </div>
    </div>
  );
}

export default ImcForm;
