import styled from "styled-components";
import { flexAlignStartStyle, flexCenterStyle } from "../../../styles/common";

export const ReviewWrapper = styled.div`
    ${flexAlignStartStyle}
    flex-direction: column;

    margin-top: ${({ theme }) => theme.spacing.medium};
`;

export const ReviewTitle = styled.div`
    font-size: ${({ theme }) => theme.fontSize.text};
    font-family: ${({ theme }) => theme.fontWeight.semiBold};
`;

export const ReviewContent = styled.div`
    font-size: ${({ theme }) => theme.fontSize.subText};
    margin-top: ${({ theme }) => theme.spacing.small};
`;

export const ReviewOverviewRight = styled.div`
    ${flexAlignStartStyle}
    flex-direction: column;
    width: 50%;

    margin-left: ${({ theme }) => theme.spacing.medium};
`;

export const ReviewOverviewWrapper = styled.div`
    ${flexCenterStyle}
    height: 5rem;

    border-radius: ${({ theme }) => theme.borderRadius.small};
    box-shadow: 0rem 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
    padding: 1rem;
    margin-bottom: ${({ theme }) => theme.spacing.medium};
    cursor: pointer;

    background-color: ${({ isSelected, theme }) =>
        isSelected ? theme.color.point.lightGreen : "transparent"};
    transition: background-color 0.3s ease;
`;

export const ReviewImg = styled.img`
    width: 40%;
    height: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.small};
    object-fit: cover;
`;
