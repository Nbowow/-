import styled from "styled-components";
import {
    flexAlignStartStyle,
    flexCenterStyle,
    flexStartStyle,
} from "../../styles/common";

export const IngredientLikeSection = styled.div`
    width: 70%;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

export const Wrapper = styled.div`
    ${flexAlignStartStyle}
`;

export const RelatedRecipe = styled.div`
    width: 100%;
    ${flexCenterStyle}
`;
export const RelatedRecipeWrapper = styled.div`
    ${flexStartStyle}
    flex-direction: column;
    width: 70%;
`;
