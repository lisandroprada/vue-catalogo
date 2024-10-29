import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001/api/v1", // Asegúrate de que esta URL coincida con la del backend
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
