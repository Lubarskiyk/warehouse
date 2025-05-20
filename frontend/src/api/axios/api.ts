import axios from "axios";
import store, { RootState } from "@/redax/store";
import {
  logoutUserApi,
  refreshTokensApi,
} from "@/api/tanstackReactQuery/auth/requests";
import { authenticated } from "@/redax/auth/slice";
import Router from "next/router";

const API_BASE_URL = "http://localhost:4000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const handleLogout = async () => {
  try {
    await logoutUserApi();
    localStorage.removeItem("accessToken");
    store.dispatch(authenticated(false));
    Router.replace("/");
  } catch (error) {
    console.error("Ошибка при выходе:", error);
  }
};

export const setupTokenInterceptor = (getState: () => RootState) => {
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const isAuthenticated = getState().auth.isAuthenticated;

      if (!isAuthenticated) return Promise.reject(error);

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const response = await refreshTokensApi();
          localStorage.setItem("accessToken", response.data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return api(originalRequest);
        } catch (err) {
          await handleLogout();
          return Promise.reject(err);
        }
      }

      if (error.response?.status === 410) {
        await handleLogout();
        return Promise.reject(error);
      }

      return Promise.reject(error);
    },
  );
};
