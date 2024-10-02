import RecipeIngredient from "./RecipeIngredient/RecipeIngredient";
import RecipeOverview from "./RecipeOverview/RecipeOverview";
import PropTypes from "prop-types";
import AllergyAlert from "./AllergyAlert/AllergyAlert";
import * as S from "./RecipeInfo.styled";
const RecipeInfo = ({ data, allergies }) => {
    return (
        <S.Wrapper>
            <S.Thumbnail src={data.recipe.imgUrl} />
            <S.Layout>
                <S.RecipeIngredientLabel>
                    <S.Title>재료</S.Title>
                    <AllergyAlert allergies={allergies} />
                </S.RecipeIngredientLabel>
                <RecipeIngredient ingredients={data.ingredients} />
                <RecipeOverview recipe={data.recipe} />
            </S.Layout>
        </S.Wrapper>
    );
};
RecipeInfo.propTypes = {
    data: PropTypes.shape({
        recipe: PropTypes.object.isRequired,
        ingredients: PropTypes.array.isRequired,
    }).isRequired,
    allergies: PropTypes.array.isRequired,
};
export default RecipeInfo;
