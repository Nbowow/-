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

    const handleSubmit = async () => {
        // 레시피 등록 요청
        const requestData = {
            title: recipeFormData.title,
            name: recipeFormData.title,
            intro: recipeFormData.intro,
            image: recipeFormData.image ? recipeFormData.image.name : "",
            servings: parseInt(recipeFormData.servings),
            time: parseInt(recipeFormData.time),
            level: recipeFormData.level,
            type: recipeFormData.type,
            situation: recipeFormData.situation,
            ingredients: recipeFormData.ingredients,
            method: recipeFormData.method,
            recipeMaterials: [],
            recipeOrders: [],
        };

        try {
            const response = await postRecipe(requestData);
            if (response) {
                // 성공 시 모달 메시지 설정
                setModalMessage(
                    <>
                        <Emoji>🍳</Emoji>레시피가 등록되었습니다!
                    </>,
                );
                setIsModalOpen(true);
                navigate("/recipe");
            }
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            // 실패 시 모달 메시지 설정
            setModalMessage(
                <>
                    <Emoji>⛔</Emoji>레시피 등록에 실패했습니다
                </>,
            );
            setIsError(true); // 에러 상태 설정
            setIsModalOpen(true); // 모달 열기
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsError(false); // 모달 닫을 때 에러 상태 초기화
    };

    const handleConfirm = async () => {
        // 확인 버튼 클릭 시 레시피 등록 요청
        await handleSubmit();
    };

    return (
        <div>
            {isModalOpen && (
                <PostModal
                    message={modalMessage}
                    onClose={closeModal}
                    onConfirm={handleConfirm} // 성공 시 확인 버튼
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
