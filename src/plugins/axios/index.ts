import axios, { type AxiosInstance } from "axios";

import responseInterceptor from "./interceptors/response";
import requestInterceptor from "./interceptors/request";

const isDevelopment = import.meta.env.MODE_ENV === "development";

const axiosInstance: AxiosInstance  = axios.create({
  baseURL: "/api", //import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: true,
});

// 请求拦截器
requestInterceptor(axiosInstance);
// 响应拦截器
responseInterceptor(axiosInstance);

export default axiosInstance;
