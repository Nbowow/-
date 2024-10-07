import PropTypes from "prop-types";
import Tag from "../../Tag/Tag";
import * as S from "./RecipeHeader.styled";
import ActionToggleGroup from "../../Toggle/ActionToggleGroup/ActionToggleGroup";

function RecipeHeader({ recipe }) {
    return (
        <S.RecipeHeaderContainer>
            <S.TopSection>
                <S.Title>{recipe.name}</S.Title>
                <S.TagWrapper>
                    <Tag tag={recipe.type} />
                    <Tag tag={recipe.situation} />
                    <Tag tag={recipe.ingredients} />
                    <Tag tag={recipe.method} />
                </S.TagWrapper>

                <S.RecipeStats>
                    <ActionToggleGroup post={recipe} />
                </S.RecipeStats>
            </S.TopSection>
            <S.RecipeDescription>{recipe.intro}</S.RecipeDescription>
        </S.RecipeHeaderContainer>
    );
}

RecipeHeader.propTypes = {
    recipe: PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        situation: PropTypes.string.isRequired,
        ingredients: PropTypes.array.isRequired,
        method: PropTypes.string.isRequired,
        intro: PropTypes.string.isRequired,
    }).isRequired,
};

export default RecipeHeader;
