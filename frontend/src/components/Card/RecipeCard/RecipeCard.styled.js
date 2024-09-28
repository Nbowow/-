import styled from "styled-components";
import {
    cardBorderRadius,
    BaseCard,
    BaseThumnail,
    BaseTitle,
    BaseText,
    BaseTextArea,
} from "../Card.styled";

export const RecipeCard = styled(BaseCard)`
    width: 322px;
`;

export const Thumnail = styled(BaseThumnail)`
    height: 13.125rem;
    border-radius: ${cardBorderRadius};
`;

export const TextArea = styled(BaseTextArea)`
    gap: ${({ theme }) => theme.fontSize.text};
    padding-left: 12px;
    padding-right: 12px;
`;

export const Title = styled(BaseTitle)`
    font-size: ${({ theme }) => theme.fontSize.h3};
`;

export const Text = styled(BaseText)`
    height: 63px;
    line-height: 21px;
    font-size: ${({ theme }) => theme.fontSize.text};
`;

export const Profile = styled.div`
    display: flex;
    gap: 12px;
    font-family: "SUITMedium";
    font-size: ${({ theme }) => theme.fontSize.h4};
    align-items: center;
`;
