// src/api/apiClient.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8081",
  timeout: 15000,
});

// 🔐 Attach JWT token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("gp_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ⚠️ Centralized error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;
    const url = error.config?.url || "Unknown endpoint";

    // 🧩 Detailed console output
    console.groupCollapsed(`🚨 API Error: ${status || "Unknown"} (${url})`);
    console.error("➡️ Method:", error.config?.method?.toUpperCase());
    console.error("🧭 Endpoint:", url);
    console.error("💬 Message:", message);
    console.groupEnd();

    // 🔒 Auto-logout on 401 Unauthorized
    if (status === 401) {
      console.warn("🔒 Unauthorized — clearing token and redirecting to login");
      localStorage.removeItem("gp_token");
      window.location.href = "/login";
    }

    // 🚫 Handle 403 specifically (Forbidden)
    if (status === 403) {
      console.warn("🚫 Forbidden — You don't have permission for this action.");
    }

    return Promise.reject(error);
  }
);

export default api;
