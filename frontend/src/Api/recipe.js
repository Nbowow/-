import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchRecipes = async (pageNumber, pageSize) => {
    pageNumber += 1;
    const response = await axios.get(
        `${BASE_URL}/recipe?pageSize=${pageSize}&pageNumber=${pageNumber}`,
    );
    return response.data;
};

export const searchRecipes = async (searchTerm) => {
    const response = await axios.get(
        `${BASE_URL}/recipe/search?keyword=${searchTerm}`,
    );
    return response.data;
};
