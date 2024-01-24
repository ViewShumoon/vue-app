import { type AxiosInstance, type AxiosResponse } from "axios";

export default (axiosInstance: AxiosInstance): void => {
    // 相应拦截器
    axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => {
            const { success, message } = response.data;
            // 处理失败请求
            if (!success) {
                window.$message.error(message);
                return Promise.reject(message);
            }
            return response;
        },
        (error: any) => {
            window.$message.error(error);
            return Promise.reject(error);
        },
    );
};
