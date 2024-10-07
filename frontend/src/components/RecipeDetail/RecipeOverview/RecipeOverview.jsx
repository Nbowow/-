import PropTypes from "prop-types";
import * as S from "./RecipeOverview.styled";
import RecipeOverviewItem from "./RecipeOverviewItem";

function RecipeOverview({ recipe }) {
    const recipeDetails = [
        { icon: "⏰", label: "시간", detail: `${recipe.time}분` },
        { icon: "🔥", label: "난이도", detail: recipe.level },
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
        time: PropTypes.number,
        level: PropTypes.string,
        calories: PropTypes.number,
        cost: PropTypes.number,
    }).isRequired,
};

export default RecipeOverview;
