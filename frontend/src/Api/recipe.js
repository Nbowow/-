/* eslint-disable no-console */
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

// API 호출 함수
export const fetchRecipes = async (pageNumber, pageSize) => {
    try {
        pageNumber += 1;
        const response = await axios.get(
            `${BASE_URL}/recipe?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        );
        return response.data; // API로부터 받은 데이터 반환
    } catch (error) {
        console.error("Error fetching recipes:", error);
        throw error; // 오류를 호출한 곳으로 전달
    }
};

export const searchRecipes = async (searchTerm) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/recipe/search?keyword=${searchTerm}`,
        );
        return response.data; // API로부터 받은 데이터 반환
    } catch (error) {
        console.error("Error fetching recipes:", error);
        throw error; // 오류를 호출한 곳으로 전달
    }
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
