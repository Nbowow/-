import styled from "styled-components";
import { flexCenterStyle, flexStartStyle } from "../../styles/common";

export const IngredientLikeSection = styled.div`
    width: 70%;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    padding: ${({ theme }) => theme.spacing.large};
    height: 25rem;
`;

export const Wrapper = styled.div`
    ${flexCenterStyle}
`;

export const TabWrapper = styled.div`
    ${flexStartStyle}
    width: 50%;
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
