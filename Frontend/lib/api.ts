import axios, {
  InternalAxiosRequestConfig,
} from "axios";

import { getToken } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (
    config: InternalAxiosRequestConfig
  ) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }
);

export default api;