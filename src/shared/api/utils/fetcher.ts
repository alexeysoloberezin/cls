import { useUserStore } from "@features/auth/state/authState";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: baseUrl || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json", 
  },
});

api.interceptors.request.use((config) => {
  const userStore = useUserStore();  
  const token = userStore?.token; 

  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
