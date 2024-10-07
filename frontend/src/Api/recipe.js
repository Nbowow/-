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

//레시피 등록
export const postRecipe = async (recipeData, token) => {
    try {
        const response = await fetch(`${BASE_URL}/recipe`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recipeData),
        });

        if (!response.ok) {
            throw new Error("Recipe posting failed");
        }

        return await response.json();
    } catch (error) {
        console.error("Error posting recipe:", error);
        throw error;
    }
};
