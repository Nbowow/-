import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const CATEGORY_TYPES = {
    TYPE: "종류",
    SITUATION: "상황",
    INGREDIENT: "재료",
    METHOD: "방법",
};

export const fetchCategories = async () => {
    const response = await axios.get(`${BASE_URL}/users/common`);

    const data = response.data;

    // API 응답 데이터를 카테고리별로 분류
    return {
        [CATEGORY_TYPES.TYPE]: data
            .filter((item) => item.commonCodeType === "B")
            .map((item) => item.commonCodeName),
        [CATEGORY_TYPES.SITUATION]: data
            .filter((item) => item.commonCodeType === "C")
            .map((item) => item.commonCodeName),
        [CATEGORY_TYPES.INGREDIENT]: data
            .filter((item) => item.commonCodeType === "D")
            .map((item) => item.commonCodeName),
        [CATEGORY_TYPES.METHOD]: data
            .filter((item) => item.commonCodeType === "E")
            .map((item) => item.commonCodeName),
    };
};
