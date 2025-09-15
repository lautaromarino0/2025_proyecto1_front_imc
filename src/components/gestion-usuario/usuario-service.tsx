import axios from "axios";
import { FormValuesLogin, FormValuesRegister } from "./interfaces-validaciones-usuario";



const apiUrl = import.meta.env.VITE_API_URL;

const UsuarioService = {

  login: async (payload:FormValuesLogin) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, payload);
      return response
    } catch (error) {
      throw error;
    }
  },

  register: async (payload:FormValuesRegister) => {
    try {

      const response = await axios.post(`${apiUrl}/auth/register`, payload);

      return response
    } catch (error) {
      throw error;
    }
  },
}

export default UsuarioService;