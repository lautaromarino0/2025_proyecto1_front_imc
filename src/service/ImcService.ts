import axios from "axios";

const API = import.meta.env.VITE_API_URL;


export const calcularImc = async (altura: number, peso: number) => {
    const token = localStorage.getItem('token');
    return await axios.post(`${API}/imc/calcular`, {
        altura,
        peso
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};


export const getHistorialImc = async () => {
    const token = localStorage.getItem('token');
    return await axios.get(`${API}/imc/historial/`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const login = async (email: string, password: string): Promise<{ access_token: string }> => {
    const res = await axios.post(`${API}/auth/login`, { email, password });
    return res.data;
};

export const register = async (email: string, password: string): Promise<void> => {
    await axios.post(`${API}/auth/register`, { email, password });
};