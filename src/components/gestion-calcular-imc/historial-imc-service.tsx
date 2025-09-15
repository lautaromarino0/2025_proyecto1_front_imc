import axios from "axios";
import { FormValuesImc } from "./interfaces-validaciones-imc";


const apiUrl = import.meta.env.VITE_API_URL;

const HistorialIMCService = {

  calcularImc: async (payload:FormValuesImc) => {
    try {
      const token = localStorage.getItem('Token');

      const {data} = await axios.post(`${apiUrl}/imc/calcular`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      });

      return data
    } catch (error) {
      throw error;
    }
  },

  getHistorialImc: async () => {
    try {
      const token = localStorage.getItem('Token');

      const {data} = await axios.get(`${apiUrl}/imc/historial`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return data
    } catch (error) {
      throw error;
    }
  },


}

export default HistorialIMCService;