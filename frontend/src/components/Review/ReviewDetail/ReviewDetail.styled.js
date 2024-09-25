import styled from "styled-components";
import {
    flexAlignStartStyle,
    flexAroundStyle,
    flexBetweenStyle,
    flexCenterStyle,
    flexStartStyle,
} from "../../../styles/common";

export const RecipeTotalRating = styled.div`
    font-size: ${({ theme }) => theme.fontSize.h6};
    font-family: ${({ theme }) => theme.fontWeight.regular};
`;
export const FlexBetween = styled.div`
    ${flexBetweenStyle}
    width: 100%;
`;
export const RecipeName = styled.div`
    font-size: ${({ theme }) => theme.fontSize.h5};
    font-family: ${({ theme }) => theme.fontWeight.semiBold};
`;
export const FlexInside = styled.div`
    ${flexAlignStartStyle}
    flex-direction: column;
    width: 100%;

    margin-left: ${({ theme }) => theme.spacing.medium};
`;
export const ReviewDate = styled.div`
    color: ${({ theme }) => theme.color.gray.dark};
    font-size: ${({ theme }) => theme.fontSize.subText};
`;
export const FlexCenter = styled.div`
    ${flexCenterStyle}
`;
export const UserName = styled.div`
    font-size: ${({ theme }) => theme.fontSize.h5};
`;
export const Wrapper = styled.div`
    ${flexAroundStyle}
    flex-direction: column;
    height: 80%;
    width: 45%;

    padding: 2rem;
    border-radius: ${({ theme }) => theme.borderRadius.small};
    box-shadow: 0rem 0.25rem 0.375rem rgba(0, 0, 0, 0.2);
`;
export const FlexLayout = styled.div`
    ${flexStartStyle}
    width: 100%;
`;
export const ReviewImg = styled.img`
    width: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.small};
`;

export const ReviewWrapper = styled.div`
    ${flexAlignStartStyle}
    flex-direction: column;
`;
export const ReviewTitle = styled.div`
    font-size: ${({ theme }) => theme.fontSize.h4};
    font-family: ${({ theme }) => theme.fontWeight.semiBold};
`;
export const ReviewContent = styled.div`
    margin-top: ${({ theme }) => theme.spacing.small};
    font-size: ${({ theme }) => theme.fontSize.h6};
    font-family: ${({ theme }) => theme.fontContent};
`;
