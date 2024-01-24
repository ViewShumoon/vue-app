import { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
// import qs from "qs";

export default (axiosInstance: AxiosInstance): void => {
    axiosInstance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            //console.log("请求配置", config);

            // if (!config.headers["content-type"]) {
            //     // 如果没有设置请求头
            //     if (config.method === "get") {
            //         config.headers["content-type"] = "application/x-www-form-urlencoded"; // post 请求
            //         config.data = qs.stringify(config.data); // 序列化,比如表单数据
            //     } else if (config.method === "post") {
            //         config.headers["content-type"] = "application/json"; // 默认类型
            //     }
            // }

            
            return config;
        },
        (error: any) => {
            // 处理请求错误
            return Promise.reject(error);
        },
    );
};
