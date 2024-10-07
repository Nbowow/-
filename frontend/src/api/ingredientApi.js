import axiosInstance from "./axios";
export const getSearchIngredient = async (term) => {
    const response = await axiosInstance.get(`/ingredient/${term}`);
    return response.data;
};
export const getIngredientPrices = async (id) => {
    const response = await axiosInstance.get("/ingredient", {
        params: { id },
    });
    return response.data;
};
