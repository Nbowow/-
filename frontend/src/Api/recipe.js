import axios from "axios";
import axiosInstance from "./axios";
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

//레시피 등록
export const postRecipe = async (recipeData) => {
    const response = await axiosInstance.post("/recipe", recipeData);
    return response.data;
};
