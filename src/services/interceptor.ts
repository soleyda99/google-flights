import axios from "axios";
import { setLoading } from "../store/slices/loadingSlice";
import store from "../store/store";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "x-rapidapi-key": "a4a3e9964amshffb97937a4b3c04p1276bcjsn8212b7edc92e",
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
    alert(error.response.data.message); // alerta global de errores
    store.dispatch(setLoading(false)); // Oculta el spinner en caso de error
    return Promise.reject(error);
  }
);

export default axiosInstance;
