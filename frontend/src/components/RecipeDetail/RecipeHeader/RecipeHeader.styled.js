import styled from "styled-components";
import { flexAlignEndStyle, flexBetweenStyle } from "../../../styles/common";

export const RecipeHeaderContainer = styled.div`
    width: 90%;
    margin: 1rem;
    padding: 1rem;
`;

export const TopSection = styled.div`
    ${flexBetweenStyle}
    width: 100%;
    height: 70%;
`;

export const Title = styled.div`
    ${flexAlignEndStyle}
    height: 100%;
    font-size: ${({ theme }) => theme.fontSize.h2};
    font-family: ${({ theme }) => theme.fontWeight.semiBold};
`;

export const TagWrapper = styled.div`
    ${flexAlignEndStyle}
    height: 100%;

    gap: ${({ theme }) => theme.spacing.medium};
    margin-left: ${({ theme }) => theme.spacing.medium};
`;

export const RecipeStats = styled.div`
    font-size: ${({ theme }) => theme.fontSize.h4};
    margin-left: auto;
`;

export const RecipeDescription = styled.div`
    font-size: ${({ theme }) => theme.fontSize.text};
    font-family: ${({ theme }) => theme.fontWeight.medium};
    color: ${({ theme }) => theme.color.gray.darkest};
    margin-top: 1rem;
`;
