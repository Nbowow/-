import PropTypes from "prop-types";
import AllergyAlert from "./AllergyAlert/AllergyAlert";
import * as S from "./RecipeInfo.styled";
const RecipeInfo = ({ recipe, allergies }) => {
    return (
        <S.Wrapper>
            <S.Thumbnail src={recipe.image} />
            <S.Layout>
                <S.RecipeIngredientLabel>
                    <S.Title>재료</S.Title>
                    <AllergyAlert allergies={allergies} />
                </S.RecipeIngredientLabel>
            </S.Layout>
        </S.Wrapper>
    );
};
RecipeInfo.propTypes = {
    recipe: PropTypes.shape({
        recipe: PropTypes.object.isRequired,
        ingredients: PropTypes.array.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
    allergies: PropTypes.array.isRequired,
};
export default RecipeInfo;
