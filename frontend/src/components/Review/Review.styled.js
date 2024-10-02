import styled from "styled-components";
import {
    flexBetweenStyle,
    flexCenterStyle,
    flexStartStyle,
} from "../../styles/common";

export const ReviewSectionBottom = styled.div`
    ${flexCenterStyle}
    width: 80%;
`;
export const ReviewSectionTop = styled.div`
    ${flexBetweenStyle}
    width: 80%;
    margin-bottom: ${({ theme }) => theme.spacing.large};
`;
export const ReviewSection = styled.div`
    ${flexCenterStyle}
    flex-direction: column;
    width: 70%;
`;

export const ReviewTitle = styled.div`
    ${flexStartStyle}
    font-size: ${({ theme }) => theme.fontSize.h4};
    font-family: ${({ theme }) => theme.fontWeight.bold};
`;

export const NoReviewsMessage = styled.div`
    ${flexCenterStyle}
    width: 80%;
`;
