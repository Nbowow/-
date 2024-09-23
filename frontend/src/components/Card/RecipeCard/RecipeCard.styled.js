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
    gap: 14px;
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

export const Image = styled.img`
    width: 31px;
    height: 31px;
    border-radius: 31px;
    background: url(<path-to-image>) lightgray 50% / cover no-repeat;
`;
