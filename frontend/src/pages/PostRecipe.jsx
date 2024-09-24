import RecipeForm from "./../components/Post/RecipeForm";
import MaterialForm from "../components/Post/MaterialForm";
import OrderForm from "../components/Post/OrderForm";
import styled from "styled-components";
const RegisterButton = styled.button`
    display: block;
    width: 100%;
    padding: 15px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #45a049;
    }
`;
const PostRecipe = () => {
    return (
        <div>
            <h1>레시피 작성하기</h1>
            <RecipeForm />
            <hr />
            <h1>재료</h1>
            <MaterialForm />
            <hr />
            <h1>요리 순서</h1>
            <OrderForm />
            <RegisterButton type="button">등록</RegisterButton>
        </div>
    );
};

export default PostRecipe;
