import axios from "axios";
import useAuthStore from "../store/userStore";

const axiosInstance = axios.create({
    baseURL: "https://j11c206.p.ssafy.io/api/v1",
});

axiosInstance.interceptors.request.use(
    (config) => {
        const { accessToken } = useAuthStore.getState();

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default axiosInstance;
