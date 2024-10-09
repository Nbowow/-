import * as S from "./CardList.styled";
import RecipeCard from "../Card/RecipeCard/RecipeCard";
import PropTypes from "prop-types";

const RecipeCardList = ({ recipes, showProfile }) => {
    return (
        <S.CardList>
            {recipes.map((recipe) => (
                <RecipeCard
                    key={recipe.recipeId}
                    showProfile={showProfile}
                    recipe={recipe}
                />
            ))}
        </S.CardList>
    );
};

RecipeCardList.propTypes = {
    recipes: PropTypes.arrayOf(
        PropTypes.shape({
            recipeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            image: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            info: PropTypes.string.isRequired,
            showProfile: PropTypes.bool.isRequired,
            profileImage: PropTypes.string,
            nickname: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    showProfile: PropTypes.bool.isRequired,
};

export default RecipeCardList;
