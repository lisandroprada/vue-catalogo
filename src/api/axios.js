import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

const apiClient = axios.create({
  baseURL: "http://localhost:3050/api/v1",
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

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore();
      try {
        await authStore.revalidateToken();
        const newToken = authStore.token;
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return axios(error.config);
      } catch (e) {
        authStore.logout();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
