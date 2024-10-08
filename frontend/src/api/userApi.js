import axiosInstance from "./axios";

export const fetchUser = async () => {
    const response = await axiosInstance.get("/users/user");
    return response.data;
};

export const getMyAllergies = async () => {
    const response = await axiosInstance.get("/users/allergys");
    return response.data;
};

export const followUser = async (id) => {
    const response = await axiosInstance.post(`/social/follow/${id}`);
    return response.data;
};

export const unFollowUser = async (id) => {
    const response = await axiosInstance.delete(`/social/follow/${id}`);
    return response.data;
};

export const getCommonCode = async () => {
    const response = await axiosInstance.get("/users/common");
    return response.data;
};
