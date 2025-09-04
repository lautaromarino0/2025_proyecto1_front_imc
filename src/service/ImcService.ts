import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const calcularImc = async (altura: number, peso: number) => 
    await axios.post(`${API}/imc/calcular`, {
        altura,
        peso
    })