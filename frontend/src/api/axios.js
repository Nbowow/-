import axios from "axios";
import { useAuthStore } from "../store/userStore";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        // const { accessToken } = useAuthStore.getState();
        const accessToken = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcyODI2MjU3NCwiZW1haWwiOiJndW5fZWxldmVuQG5hdmVyLmNvbSJ9.kqqb-oB8xWo76fcPR9YjU4kK-ledKRP_dMRU4ytb1fYQuh1TEmi7wZ4HXi3qkMLkRO6oQS2e6vw7kIzxDFfVng`;
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
        const { logout } = useAuthStore.getState();
        if (error.response?.status === 401) {
            logout();
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;
