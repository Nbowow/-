import styled from "styled-components";
import {
    cardBorderRadius,
    BaseCard,
    BaseThumnail,
    BaseTitle,
    BaseText,
    BaseTextArea,
} from "../Card.styled";

export const PostCard = styled(BaseCard)`
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
    font-size: ${({ theme }) => theme.fontSize.h4};
`;

export const Text = styled(BaseText)`
    height: 63px;
    line-height: 21px;
    font-size: ${({ theme }) => theme.fontSize.text};
`;
