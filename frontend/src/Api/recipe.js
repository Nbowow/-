/* eslint-disable no-console */
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchRecipes = async (pageNumber, pageSize) => {
    try {
        pageNumber += 1;
        const response = await axios.get(
            `${BASE_URL}/recipe?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        throw error;
    }
};

export const searchRecipes = async (searchTerm) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/recipe/search?keyword=${searchTerm}`,
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        throw error;
    }
};
