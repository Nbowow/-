import RecipeForm from "./../components/Post/RecipeForm";
import MaterialForm from "../components/Post/MaterialForm";
import OrderForm from "../components/Post/OrderForm";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { postRecipe } from "../api/recipe";
import { fetchCategories } from "../api/category";
import { useNavigate } from "react-router-dom";
import PostModal from "../components/Modal/PostModal";

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

const Emoji = styled.span`
    font-family: "tosseface"; // tossface 폰트 적용
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

    const [modalMessage, setModalMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isError, setIsError] = useState(false); // 에러 상태 추가

    useEffect(() => {
        const getCategories = async () => {
            const categorizedData = await fetchCategories();
            setCategories(categorizedData);
        };
        getCategories();
    }, []);

    const handleConfirm = async () => {
        const success = await handleSubmit(); // 레시피 등록 요청

        if (success) {
            // 성공적으로 등록되었을 경우 네비게이트
            navigate("/recipe");
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        // 레시피 이미지 추가
        if (recipeFormData.image) {
            formData.append("recipeImage", recipeFormData.image);
        }

        // 조리 순서 이미지 추가
        orderSteps.forEach((step) => {
            if (step.image) {
                formData.append("orderImages", step.image);
            }
        });

        // 레시피 데이터 추가
        const recipeData = {
            title: recipeFormData.title,
            name: recipeFormData.name,
            intro: recipeFormData.intro,
            servings: recipeFormData.servings,
            time: recipeFormData.time,
            level: recipeFormData.level,
            type: recipeFormData.type,
            situation: recipeFormData.situation,
            ingredients: recipeFormData.ingredients,
            method: recipeFormData.method,
            recipeMaterials: materialGroups.map((group) => ({
                materialName: group.name,
                materialAmount: group.materials.map((m) => m.amount).join(", "),
                materialUnit: group.materials.map((m) => m.unit).join(", "),
                materialSubtitle: group.materials
                    .map((m) => m.subtitle)
                    .join(", "),
            })),
            recipeOrders: orderSteps.map((step, index) => ({
                orderNum: index + 1,
                orderContent: step.content,
            })),
        };

        formData.append(
            "recipe",
            new Blob([JSON.stringify(recipeData)], {
                type: "application/json",
            }),
        );

        try {
            const response = await postRecipe(formData); // API 호출

            if (response) {
                setModalMessage(
                    <>
                        <Emoji>🍳</Emoji>레시피를 등록하시겠습니까?
                    </>,
                );
                setIsModalOpen(true);
                return true; // 성공적으로 등록된 경우 true 반환
            }
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setModalMessage(
                <>
                    <Emoji>⛔</Emoji>레시피 등록에 실패했습니다
                </>,
            );
            setIsError(true);
            setIsModalOpen(true);
        }

        return false;
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsError(false);
    };

    return (
        <div>
            {isModalOpen && (
                <PostModal
                    message={modalMessage}
                    onClose={closeModal}
                    onConfirm={handleConfirm}
                    isError={isError}
                />
            )}
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
