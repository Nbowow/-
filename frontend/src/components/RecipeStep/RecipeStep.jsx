import PropTypes from "prop-types";
import * as S from "./Recipe.styled";
function RecipeStep({ recipe }) {
    return (
        <S.StepContainer>
            {recipe.map((step, index) => (
                <S.StepWrapper key={index}>
                    <S.CircleNumber>{index + 1}</S.CircleNumber>
                    <S.StepDescription>{step.text}</S.StepDescription>
                    <S.StepImage src={step.img} alt={`Step ${index + 1}`} />
                </S.StepWrapper>
            ))}
        </S.StepContainer>
    );
}

RecipeStep.propTypes = {
    recipe: PropTypes.array.isRequired,
};

export default RecipeStep;
