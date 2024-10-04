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
