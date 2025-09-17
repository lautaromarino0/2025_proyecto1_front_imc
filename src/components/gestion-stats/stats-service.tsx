import axios from "axios";


const apiUrl = import.meta.env.VITE_API_URL;

const StatsService = {

  getUserImcStats: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.get(`${apiUrl}/stats/imc-evolucion`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserWeightStats: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.get(`${apiUrl}/stats/peso-evolucion`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserAggregatedStats: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.get(`${apiUrl}/stats/metricas`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
}

export default StatsService;
