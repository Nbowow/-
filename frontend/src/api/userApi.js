import axiosInstance from "./axios";

export const fetchUser = async () => {
    const response = await axiosInstance.get("/users/user");
    return response.data;
};
export const getCommonCode = async () => {
    const response = await axiosInstance.get("/users/common");
    return response.data;
};
