import styled from "styled-components";
import {
    flexAlignStartStyle,
    flexCenterStyle,
    flexStartStyle,
} from "../../../styles/common";

export const IngredientWrapper = styled.div`
    ${flexAlignStartStyle}
    background-color: ${({ theme }) => theme.color.point.lightYellow};
    border-radius: 1rem;
    width: 50%;
`;

export const IngredientColumn = styled.div`
    ${flexCenterStyle};
    flex-direction: column;
    margin: 1rem 0;
    width: 45%;
`;

export const Ingredient = styled.div`
    width: 60%;
    ${flexStartStyle};
    margin: 0.2rem;
`;
export const IngredientName = styled.div`
    font-size: ${({ theme }) => theme.fontSize.text};
    font-family: ${({ theme }) => theme.fontWeight.semiBold};
    margin-right: 0.8rem;
`;
export const IngredientAmount = styled.div`
    font-size: ${({ theme }) => theme.fontSize.subText};
    font-family: ${({ theme }) => theme.fontWeight.regular};
`;
