import styled from "styled-components";
import {
    cardBorderRadius,
    BaseCard,
    BaseThumnail,
    BaseTitle,
    BaseText,
    BaseTextArea,
} from "../Card.styled";

export const IntroCard = styled(BaseCard)`
    width: 17.25rem;
    height: 22.438rem;
    border-radius: ${cardBorderRadius};
    box-shadow: 0px 0.25rem 1.25rem rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition:
        transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1),
        box-shadow 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);

    &:hover {
        transform: translateY(-0.625rem) scale(1.04);
        box-shadow: 0px 0.4rem 1.5rem rgba(0, 0, 0, 0.3);
    }

    &:active {
        background-color: ${({ theme }) => theme.color.point.lightGreen};
    }
`;

export const Thumnail = styled(BaseThumnail)`
    height: 13.125rem;
    border-top-left-radius: ${cardBorderRadius};
    border-top-right-radius: ${cardBorderRadius};
`;

export const TextArea = styled(BaseTextArea)`
    padding: 0.125rem 1.25rem;
    gap: 0.938rem;
    justify-content: center;
    align-items: flex-start;
`;

export const Title = styled(BaseTitle)`
    font-size: ${({ theme }) => theme.fontSize.h4};
`;

export const Text = styled(BaseText)`
    height: 4.125rem;
    line-height: 1.313rem;
    font-size: ${({ theme }) => theme.fontSize.text};
`;
