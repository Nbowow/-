import styled from "styled-components";
import { flexAlignStartStyle, flexCenterStyle } from "../../styles/common";

export const IngredientLikeSection = styled.div`
    width: 70%;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    padding: ${({ theme }) => theme.spacing.large};
    height: 25rem;
`;

export const Wrapper = styled.div`
    ${flexAlignStartStyle}
`;
export const TabWrapper = styled.div`
    width: 50%;
    ${flexCenterStyle}
`;

export const RelatedRecipe = styled.div`
    display: flex;
`;
