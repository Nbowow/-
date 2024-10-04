import axiosInstance from "./axios";

export const fetchUser = async () => {
    const response = await axiosInstance.get("/users/user");
    return response.data;
};

export const fetchUserRecipe = async () => {
    const response = await axiosInstance.get("/users/recipe");
    return response.data;
};
