import axios from "axios";
// import { useAuthStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";
// import { defaultMethod } from "react-router-dom/dist/dom";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        // const { accessToken } = useAuthStore.getState();
        const accessToken =
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcyODQzOTY3MywiZW1haWwiOiJndW5fZWxldmVuQG5hdmVyLmNvbSJ9.NLZlLie6JUXJAQl766IUsFjSvAdxHAdOATAYsqPVvTnh7LjaaY8Sbw1Dt8TCJPfFbrjKQsfdnqkPLdZMZiEE8Q";

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
