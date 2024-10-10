import styled from "styled-components";
import { flexAlignStartStyle, flexBetweenStyle } from "../../../styles/common";

export const Wrapper = styled.div`
    ${flexAlignStartStyle}
    width: 50%;
    height: 20rem;
    flex-wrap: wrap;
    overflow-y: auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    ::-webkit-scrollbar {
        display: none;
    }
    scrollbar-width: none;
    -ms-overflow-style: none;
`;
export const Name = styled.div`
    font-size: ${({ theme }) => theme.fontSize.h4};
    font-family: ${({ theme }) => theme.fontWeight.bold};
`;

export const Img = styled.img`
    border-radius: ${({ theme }) => theme.borderRadius.small};
    height: 4rem;
    width: 70%;
    margin: ${({ theme }) => theme.spacing.medium} 0;
`;
export const Info = styled.div`
    ${flexBetweenStyle}
    flex-direction: column;
    width: 7rem;
    background-color: ${({ theme, isSelected }) =>
        isSelected ? theme.color.point.green : theme.color.point.lightGreen};
    border-radius: ${({ theme }) => theme.borderRadius.small};
    margin: ${({ theme }) => theme.spacing.small};
    padding: ${({ theme }) => theme.spacing.large};
    cursor: pointer;
    transition:
        transform 1s ease,
        box-shadow 1s ease;
    &:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    ${({ isSelected }) =>
        isSelected &&
        `
        transform: scale(1.05); 
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); 
    `}
`;
export const Remove = styled.div`
    width: 100%;
    text-align: right;
    cursor: pointer;
    opacity: 0.7;
    font-family: "TossFace";
`;
