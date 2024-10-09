import * as S from "./CardList.styled";
import RecipeCard from "../Card/RecipeCard/RecipeCard";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const RecipeCardList = ({ recipes }) => {
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 가져오기

    const handleCardClick = (recipeId) => {
        navigate(`/recipe/${recipeId}`); // recipeId를 사용하여 상세 페이지로 이동
    };

    return (
        <S.CardList>
            {recipes.map((recipe) => (
                <div key={recipe.id} onClick={() => handleCardClick(recipe.id)}>
                    <RecipeCard {...recipe} />
                </div>
            ))}
        </S.CardList>
    );
};

RecipeCardList.propTypes = {
    recipes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            imgUrl: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            showProfile: PropTypes.bool.isRequired,
            profileImgUrl: PropTypes.string,
            author: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
};

export default RecipeCardList;
