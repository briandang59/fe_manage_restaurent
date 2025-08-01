import axios from "axios";
import { tokenManager } from "./tokenManager";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor để tự động thêm token vào header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor để xử lý lỗi
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Xử lý lỗi 401 (Unauthorized) - token hết hạn
      if (error.response.status === 401) {
        tokenManager.removeToken();
        // Có thể redirect về trang login ở đây
        window.location.href = "/login";
      }
      return Promise.reject(error.response.data);
    } else if (error.request) {
      return Promise.reject({ message: "No response from server" });
    } else {
      return Promise.reject({ message: error.message });
    }
  }
);
