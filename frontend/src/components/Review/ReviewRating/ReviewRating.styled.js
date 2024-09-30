import styled from "styled-components";

import { flexCenterStyle } from "../../../styles/common";
export const BarWrapper = styled.div`
    ${flexCenterStyle}
    width: 60%;
    padding: ${({ theme }) => theme.spacing.small};
    margin-left: ${({ theme }) => theme.spacing.medium};
    margin-right: -0.5rem;
`;
export const RatingWrapper = styled.div`
    ${flexCenterStyle}
    flex-direction: column;
    width: 40%;
    padding: ${({ theme }) => theme.spacing.small};
    border-right: 0.05rem solid ${({ theme }) => theme.color.gray.light};
`;
export const RatingLabel = styled.div`
    font-size: ${({ theme }) => theme.fontSize.h2};
    font-family: ${({ theme }) => theme.fontWeight.bold};
    margin: ${({ theme }) => theme.spacing.medium};
`;
export const Wrapper = styled.div`
    ${flexCenterStyle}
    width: 18rem;
    height: 8rem;

    background-color: ${({ theme }) => theme.color.gray.lighter};
    border-radius: ${({ theme }) => theme.borderRadius.large};
`;
