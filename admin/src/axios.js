import axios from "axios";
import { backendUrl } from "../App";
import refreshToken from "./refreshToken"; // Import refresh function

const api = axios.create({
  baseURL: backendUrl,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("🔄 Token expired, refreshing...");
      const newToken = await refreshToken();
      if (newToken) {
        localStorage.setItem("token", newToken);
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return api.request(error.config);
      } else {
        console.error("❌ Token refresh failed. Logging out.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
