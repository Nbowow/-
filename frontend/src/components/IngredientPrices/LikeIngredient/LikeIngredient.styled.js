import styled from "styled-components";
import { flexAroundStyle, flexStartStyle } from "../../../styles/common";

export const Wrapper = styled.div`
    ${flexStartStyle}
    width: 30%;
    height: auto;
    flex-direction: column;
    background-color: ${({ theme }) => theme.color.gray.lighter};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
`;
export const Name = styled.div`
    font-size: ${({ theme }) => theme.fontSize.h4};
    font-family: ${({ theme }) => theme.fontWeight.bold};
`;

export const Img = styled.img`
    border-radius: ${({ theme }) => theme.borderRadius.large};
    height: 3rem;
    width: 25%;
    padding: ${({ theme }) => theme.spacing.large};
`;
export const Info = styled.div`
    ${flexAroundStyle}
    width: 80%;
`;
export const Remove = styled.div``;
