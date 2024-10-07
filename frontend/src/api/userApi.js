import axiosInstance from "./axios";

export const fetchUser = async () => {
    const response = await axiosInstance.get("/users/user");
    return response.data;
};
export const getUserLike = async () => {
    const response = await axiosInstance.get("/users/like");
    return response.data;
};
