import * as S from "./CardList.styled";
import RecipeCard from "../Card/RecipeCard/RecipeCard";
import PropTypes from "prop-types";

const RecipeCardList = ({ recipes }) => {
    return (
        <S.CardList>
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.recipeId} {...recipe} />
            ))}
        </S.CardList>
    );
};

RecipeCardList.propTypes = {
    recipes: PropTypes.arrayOf(
        PropTypes.shape({
            recipeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
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
