import PropTypes from "prop-types";
import Tag from "../../Tag/Tag";
import * as S from "./RecipeHeader.styled";
import ActionToggleGroup from "../../Toggle/ActionToggleGroup/ActionToggleGroup";

function RecipeHeader({ data }) {
    return (
        <S.RecipeHeaderContainer>
            <S.TopSection>
                <S.Title>{data.title}</S.Title>
                <S.TagWrapper>
                    <Tag tag={data.tag[0]} />
                    <Tag tag={data.tag[1]} />
                </S.TagWrapper>

                <S.RecipeStats>
                    <ActionToggleGroup />
                </S.RecipeStats>
            </S.TopSection>
            <S.RecipeDescription>{data.text}</S.RecipeDescription>
        </S.RecipeHeaderContainer>
    );
}

RecipeHeader.propTypes = {
    data: PropTypes.object.isRequired,
};

export default RecipeHeader;
