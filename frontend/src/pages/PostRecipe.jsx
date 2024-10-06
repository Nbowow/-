import RecipeForm from "./../components/Post/RecipeForm";
import MaterialForm from "../components/Post/MaterialForm";
import OrderForm from "../components/Post/OrderForm";
import styled from "styled-components";
import { useState } from "react";
import { postRecipe } from "../Api/recipe";
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

    const handleSubmit = async () => {
        try {
            // RecipeMaterialsRequestDto 형식으로 변환
            const recipeMaterials = materialGroups.flatMap((group) =>
                group.materials.map((material) => ({
                    materialName: material.name,
                    materialAmount: material.amount,
                    materialUnit: material.unit,
                    materialSubtitle: group.name,
                })),
            );

            // RecipeOrdersRequestDto 형식으로 변환
            const recipeOrders = orderSteps.map((step, index) => ({
                orderNum: index + 1,
                orderImg: step.image,
                orderContent: step.content,
            }));

            // 최종 요청 데이터 구성
            const requestData = {
                ...recipeFormData,
                recipeMaterials,
                recipeOrders,
            };

            const token = "your-auth-token"; // 실제 토큰 값으로 대체
            await postRecipe(requestData, token);
            // eslint-disable-next-line no-alert
            alert("레시피가 성공적으로 등록되었습니다!");
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            // eslint-disable-next-line no-alert
            alert("레시피 등록 중 오류가 발생했습니다.");
        }
    };

    return (
        <div>
            <RecipeForm
                recipeData={recipeFormData}
                setRecipeData={setRecipeFormData}
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
