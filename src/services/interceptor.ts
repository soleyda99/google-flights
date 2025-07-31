import axios from "axios";
import { setLoading } from "../store/slices/loadingSlice";
import store from "../store/store";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "x-rapidapi-key": "388aada64dmsh2e2cf3532f89697p1e3f62jsn4686d567fa47",
    "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
  },
});

// Interceptores de Axios
axiosInstance.interceptors.request.use(
  (config) => {
    store.dispatch(setLoading(true)); // Muestra el spinner
    return config;
  },
  (error) => {
    store.dispatch(setLoading(false)); // Oculta el spinner en caso de error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    store.dispatch(setLoading(false)); // Oculta el spinner después de recibir la respuesta
    return response;
  },
  (error) => {
    console.log(error.response.data.message); // colocar una alerta global de errores
    store.dispatch(setLoading(false)); // Oculta el spinner en caso de error
    return Promise.reject(error);
  }
);

export default axiosInstance;
