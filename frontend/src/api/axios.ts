import axios from "axios"; 
import type{
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

import {refreshAccessToken} from "./refresh";
// An Axios instance is a pre-configured Axios client. 
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const apiConnector = <T = unknown>(
  method: HttpMethod,
  url: string,
  bodyData?: unknown,
  headers?: AxiosRequestConfig["headers"],
  params?: AxiosRequestConfig["params"]
): Promise<AxiosResponse<T>> => {
  return axiosInstance({
    method,
    url,
    data: bodyData ?? undefined,
    headers,
    params,
  });
};

// An interceptor is a function that runs automatically before or after a request/response.

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    
    if (
      error.response?.status === 401 &&
      error.response?.data?.code === "TOKEN_EXPIRED" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await refreshAccessToken();
        return axiosInstance(originalRequest);
      } catch {
        // ❗ HARD LOGOUT
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
