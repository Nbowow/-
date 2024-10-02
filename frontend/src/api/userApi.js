import axiosInstance from "./axios";

export const fetchMemberInfo = async () => {
    const response = await axiosInstance.get("/users/user");
    return response.data;
};
