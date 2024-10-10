import styled, { keyframes } from "styled-components";
import { flexCenterStyle, flexStartStyle } from "../../styles/common";

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-20px); 
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const IngredientLikeSection = styled.div`
    width: 70%;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    padding: ${({ theme }) => theme.spacing.large};
    height: 22rem;
    animation: ${fadeIn} 1s ease-in-out;
`;

export const Wrapper = styled.div`
    ${flexCenterStyle}
    width: 100%;
`;

export const TabWrapper = styled.div`
    ${flexStartStyle}
    width: 50%;
    margin-top: -4rem;
`;

export const RelatedRecipeWrapper = styled.div`
    ${flexStartStyle}
    flex-direction: column;
    width: 70%;
    animation: ${fadeIn} 1s ease-in-out;
`;
