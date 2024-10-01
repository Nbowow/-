import styled from "styled-components";
import { flexCenterStyle, flexStartStyle } from "../../styles/common";

export const Live = styled.div``;
export const RecommendSection = styled.div`
    ${flexStartStyle}
    width: 70%;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    padding: ${({ theme }) => theme.spacing.large};
    height: auto;
    margin-top: 3rem;
`;

export const Hot = styled.div``;
export const Label = styled.div`
    margin-left: 1rem;
    font-family: ${({ theme }) => theme.fontWeight.bold};
`;
export const Container = styled.div`
    width: 100%;
    ${flexCenterStyle}
    margin-bottom: 3rem;
    flex-direction: column;
`;

export const IngredientLikeSection = styled.div`
    width: 70%;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    padding: ${({ theme }) => theme.spacing.large};
    height: 25rem;
`;

export const Title = styled.div`
    ${flexStartStyle}
    width: 100%;
    margin: 1rem;
    font-size: ${({ theme }) => theme.fontSize.h3};
`;
