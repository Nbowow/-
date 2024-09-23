import styled from "styled-components";
import { flexCenterStyle } from "../../../styles/common";

export const RecipeOverviewWrapper = styled.div`
    ${flexCenterStyle}
    flex-direction: column;
    margin: 0.5rem;
`;
export const Icon = styled.div`
    font-size: ${({ theme }) => theme.fontSize.h1};
    font-family: "TossFace";
`;
export const Label = styled.div`
    font-size: ${({ theme }) => theme.fontSize.subText};
    font-family: ${({ theme }) => theme.fontWeight.regular};
    color: ${({ theme }) => theme.color.gray.dark};

    margin: 0.3rem 0;
`;
export const Detail = styled.div`
    font-size: ${({ theme }) => theme.fontSize.text};
    font-family: ${({ theme }) => theme.fontWeight.bold};
`;
export const Wrapper = styled.div`
    ${flexCenterStyle}
    width: 100%;
    margin-top: 1rem;
`;
