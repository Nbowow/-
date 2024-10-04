import axios from "axios";
import { useAuthStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
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

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const navigate = useNavigate();
        if (
            error.response?.status === 302 ||
            error.message === "Network Error"
        ) {
            navigate("/");
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;
