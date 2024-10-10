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

export const searchRecipes = async (searchTerm, pageNumber, pageSize) => {
    const response = await axios.get(
        `${BASE_URL}/recipe/search?keyword=${searchTerm}&pageNumber=${pageNumber + 1}&pageSize=${pageSize}`,
    );

    return response.data;
};

export const filterRecipes = async (
    type,
    situation,
    ingredient,
    method,
    pageNumber,
    pageSize,
) => {
    const params = new URLSearchParams();

    if (type) {
        params.append("B", type);
    }
    if (situation) {
        params.append("C", situation);
    }
    if (ingredient) {
        params.append("D", ingredient);
    }
    if (method) {
        params.append("E", method);
    }

    // 페이지 정보 추가
    params.append("pageNumber", pageNumber + 1); // API에서 1부터 시작하므로 +1
    params.append("pageSize", pageSize); // 페이지 사이즈

    const response = await axios.get(
        `${BASE_URL}/recipe/category?${params.toString()}`,
    );
    const data = response.data.recipes;
    const totalCount = response.data.totalCount;
    return { data, totalCount };
};

// 레시피 등록
export const postRecipe = async (formData) => {
    const response = await axiosInstance.post("/recipe", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

//레시피 삭제
export const deleteRecipe = async (id) => {
    const response = await axiosInstance.delete(`/recipe/${id}`);
    return response.data;
};

export const postComment = async (id, content) => {
    const response = await axiosInstance.post(
        "/recipe/comment",
        { content },
        {
            params: { id },
        },
    );
    return response.data;
};

export const getComments = async (id) => {
    const response = await axiosInstance.get("/recipe/comment", {
        params: { id },
    });
    return response.data;
};

export const getRecipe = async (id) => {
    const response = await axiosInstance.get(`/recipe/${id}`);
    return response.data;
};

export const postRecipeLike = async (id) => {
    const response = await axiosInstance.post(
        "/recipe/like",
        {},
        {
            params: { id },
        },
    );
    return response.data;
};

export const patchRecipeUnLike = async (id) => {
    const response = await axiosInstance.patch(
        "/recipe/unlike",
        {},
        {
            params: { id },
        },
    );
    return response.data;
};

export const postRecipeScrap = async (id) => {
    const response = await axiosInstance.post(
        "/recipe/scrap",
        {},
        {
            params: { id },
        },
    );
    return response.data;
};

export const patchRecipeUnScrap = async (id) => {
    const response = await axiosInstance.patch(
        "/recipe/unscrap",
        {},
        {
            params: { id },
        },
    );
    return response.data;
};

export const getReviews = async (id) => {
    const response = await axiosInstance.get("/recipe/review", {
        params: { id },
    });
    return response.data;
};

export const postReview = async (formData, id) => {
    const response = await axiosInstance.post("/recipe/review", formData, {
        params: { id },
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};
