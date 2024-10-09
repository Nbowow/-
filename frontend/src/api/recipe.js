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

export const getReviews = async (id) => {
    // const response = await axiosInstance.get("/recipe/review", {
    //     params: { id },
    // });

    const response = [
        {
            id: 1,
            rating: 5,
            title: "맛있어용",
            content: "굿굿굿굿",
            imgUrl: "https://cdn.pixabay.com/photo/2021/07/19/16/04/pizza-6478478_1280.jpg",
        },
    ];

    return response;
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
