import RecipeForm from "./../components/Post/RecipeForm";
import MaterialForm from "../components/Post/MaterialForm";
import OrderForm from "../components/Post/OrderForm";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { postRecipe } from "../api/recipe";
import { fetchCategories } from "../api/category";

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
    const [recipeFormData, setRecipeFormData] = useState({
        title: "",
        name: "",
        intro: "",
        image: null,
        servings: 0,
        time: 0,
        level: "",
        cookingTools: "",
        type: "",
        situation: "",
        ingredients: "",
        method: "",
    });
    const [materialGroups, setMaterialGroups] = useState([]);
    const [orderSteps, setOrderSteps] = useState([]);
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
        const recipeMaterials = materialGroups.flatMap((group) =>
            group.materials.map((material) => ({
                materialName: material.name,
                materialAmount: material.amount,
                materialUnit: material.unit,
                materialSubtitle: group.name,
            })),
        );

        const recipeOrders = orderSteps.map((step, index) => ({
            orderNum: index + 1,
            orderImg: step.image,
            orderContent: step.content,
        }));

        const requestData = {
            ...recipeFormData,
            recipeMaterials,
            recipeOrders,
        };
        await postRecipe(requestData);
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
