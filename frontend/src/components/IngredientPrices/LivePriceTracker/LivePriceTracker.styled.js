import styled from "styled-components";
import {
    flexAlignStartStyle,
    flexBetweenStyle,
    flexCenterStyle,
    flexStartStyle,
} from "../../../styles/common";

export const ChartWrapper = styled.div`
    width: 30%;
`;
export const IngredientInfoLayout = styled.div`
    ${flexBetweenStyle};
    width: 100%;
`;
export const IngredientInfo = styled.div`
    ${flexAlignStartStyle}
    flex-direction: column;
    width: 60%;
    margin-left: ${({ theme }) => theme.spacing.large};
`;
export const Wrapper = styled.div`
    width: 18rem;
    height: 5rem;
    padding: ${({ theme }) => theme.spacing.large};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    box-shadow: 0rem 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
    ${flexCenterStyle}
`;

export const IngredientName = styled.div`
    font-size: ${({ theme }) => theme.fontSize.h4};
    font-family: ${({ theme }) => theme.fontWeight.bold};
`;
export const IngredientPrice = styled.div`
    margin: 0 ${({ theme }) => theme.spacing.small};
    font-family: ${({ theme }) => theme.fontWeight.bold};
`;
export const IngredientLabel = styled.div`
    margin-top: ${({ theme }) => theme.spacing.medium};
    font-size: ${({ theme }) => theme.fontSize.text};
    ${flexStartStyle}
`;
