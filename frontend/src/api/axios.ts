import axios from "axios"; 
import type{
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

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

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);
