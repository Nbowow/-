import PropTypes from "prop-types";
import * as S from "./RecipeOverview.styled";
import RecipeOverviewItem from "./RecipeOverviewItem";

function RecipeOverview({ recipe }) {
    const recipeDetails = [
        { icon: "⏰", label: "시간", detail: `${recipe.minute}분` },
        { icon: "🔥", label: "난이도", detail: recipe.difficulty },
        { icon: "🏋️‍♂️", label: "예상 칼로리", detail: `${recipe.calories}Kal` },
        { icon: "💸", label: "예상 가격", detail: `${recipe.cost}원` },
    ];

    return (
        <S.Wrapper>
            {recipeDetails.map((item, index) => (
                <RecipeOverviewItem
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    detail={item.detail}
                />
            ))}
        </S.Wrapper>
    );
}

RecipeOverview.propTypes = {
    recipe: PropTypes.shape({
        minute: PropTypes.string,
        difficulty: PropTypes.string,
        calories: PropTypes.string,
        cost: PropTypes.string,
    }).isRequired,
};

export default RecipeOverview;
