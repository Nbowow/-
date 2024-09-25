import styled from "styled-components";

import { flexCenterStyle } from "../../../styles/common";
export const BarWrapper = styled.div`
    ${flexCenterStyle}
    height: 100%;
    width: 60%;

    margin-left: ${({ theme }) => theme.spacing.large};
`;
export const RatingWrapper = styled.div`
    ${flexCenterStyle}
    flex-direction: column;
    width: 50%;
    height: 70%;

    padding: ${({ theme }) => theme.spacing.medium};
    border-right: 0.05rem solid ${({ theme }) => theme.color.gray.light};
`;
export const RatingLabel = styled.div`
    font-size: ${({ theme }) => theme.fontSize.h1};
    font-family: ${({ theme }) => theme.fontWeight.extraBold};
    margin: ${({ theme }) => theme.spacing.medium};
`;
export const Wrapper = styled.div`
    ${flexCenterStyle}
    width: 20rem;
    height: 8rem;

    background-color: ${({ theme }) => theme.color.gray.lighter};
    border-radius: ${({ theme }) => theme.borderRadius.large};
`;
