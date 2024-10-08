/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import RecipeForm from "./../components/Post/RecipeForm";
import MaterialForm from "../components/Post/MaterialForm";
import OrderForm from "../components/Post/OrderForm";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { postRecipe } from "../api/recipe";
import { fetchCategories } from "../api/category";
import { useNavigate } from "react-router-dom";

const CATEGORY_TYPES = {
    TYPE: "종류",
    SITUATION: "상황",
    INGREDIENT: "재료",
    METHOD: "방법",
};

const RegisterButton = styled.button`
    display: block;
    width: 20%;
    padding: 15px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-family: "SUITSEMIBOLD";
    font-size: 20px;
    &:hover {
        background-color: #45a049;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

const Hr = styled.hr`
    margin-top: 50px;
    margin-bottom: 50px;
    border-top: 2px solid ${({ theme }) => theme.color.gray.light};
    width: 80%;
`;

const PostRecipe = () => {
    const navigate = useNavigate();
    const [recipeFormData, setRecipeFormData] = useState({
        title: "",
        name: "",
        intro: "",
        image: null,
        servings: "",
        time: "",
        level: "",
        cookingTools: "",
        type: "",
        situation: "",
        ingredients: "",
        method: "",
    });
    const [materialGroups, setMaterialGroups] = useState([
        { name: "", materials: [{ name: "", amount: "", unit: "" }] },
    ]);
    const [orderSteps, setOrderSteps] = useState([
        { image: null, content: "" },
    ]);
    const [categories, setCategories] = useState({
        [CATEGORY_TYPES.TYPE]: [],
        [CATEGORY_TYPES.SITUATION]: [],
        [CATEGORY_TYPES.INGREDIENT]: [],
        [CATEGORY_TYPES.METHOD]: [],
    });

    useEffect(() => {
        const getCategories = async () => {
            const categorizedData = await fetchCategories();
            setCategories(categorizedData);
        };
        getCategories();
    }, []);

    const handleSubmit = async () => {
        // FormData 생성
        const formData = new FormData();

        // 재료 정보 변환
        const recipeMaterials = materialGroups.flatMap((group) =>
            group.materials.map((material) => ({
                materialName: material.name,
                materialAmount: material.amount,
                materialUnit: material.unit,
                materialSubtitle: group.name || "양념", // 기본값 설정
            })),
        );

        // 요리 순서 정보 변환
        const recipeOrders = orderSteps.map((step, index) => ({
            orderNum: index + 1,
            orderImg: step.image ? step.image.name : "", // 이미지가 없을 경우 빈 문자열로 설정
            orderContent: step.content,
        }));

        // 요청 데이터 구성
        const requestData = {
            title: recipeFormData.title,
            name: recipeFormData.title, // title을 name으로 사용
            intro: recipeFormData.intro,
            image: recipeFormData.image ? recipeFormData.image.name : "", // 파일 이름으로 설정
            servings: parseInt(recipeFormData.servings),
            time: parseInt(recipeFormData.time),
            level: recipeFormData.level,
            type: recipeFormData.type,
            situation: recipeFormData.situation,
            ingredients: recipeFormData.ingredients,
            method: recipeFormData.method,
            recipeMaterials,
            recipeOrders,
        };

        console.log(requestData);

        try {
            const response = await postRecipe(requestData);
            if (response) {
                alert("레시피가 성공적으로 등록되었습니다.");
                navigate("/recipe");
            }
        } catch (error) {
            alert("레시피 등록에 실패했습니다.");
            console.error("Error posting recipe:", error);
        }
    };

    return (
        <div>
            <RecipeForm
                recipeData={recipeFormData}
                setRecipeData={setRecipeFormData}
                categories={categories}
            />
            <Hr />

            <MaterialForm
                materialGroups={materialGroups}
                setMaterialGroups={setMaterialGroups}
            />
            <Hr />

            <OrderForm orderSteps={orderSteps} setOrderSteps={setOrderSteps} />
            <ButtonContainer>
                <RegisterButton onClick={handleSubmit}>등록</RegisterButton>
            </ButtonContainer>
        </div>
    );
};

export default PostRecipe;
