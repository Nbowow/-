import styled from "styled-components";
import {
    flexAlignStartStyle,
    flexCenterStyle,
    flexStartStyle,
} from "../../styles/common";

export const StepWrapper = styled.div`
    ${flexAlignStartStyle}
    height: 7rem;
    margin-top: 1rem;
`;
export const StepContainer = styled.div`
    width: 80%;
`;
export const CircleNumber = styled.div`
    ${flexCenterStyle}
    width: 2rem;
    height: 2rem;
    background-color: ${({ theme }) => theme.color.point.green};
    font-family: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSize.h4};
    color: white;
    border-radius: 50%;
    text-align: center;
`;

export const StepDescription = styled.div`
    ${flexStartStyle}
    width: 80%;
    height: 100%;

    background-color: ${({ theme }) => theme.color.point.lightGreen};
    font-family: ${({ theme }) => theme.fontWeight.medium};
    font-size: ${({ theme }) => theme.fontSize.text};

    margin-left: 1rem;

    border-radius: 0 2rem 2rem 2rem;
    padding: 1rem;
    box-sizing: border-box;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    text-align: start;
    align-items: flex-start;
`;

export const StepImage = styled.img`
    width: 15%;
    height: 100%;
    margin-left: 1rem;

    border-radius: 0.8rem;
    object-fit: cover;
`;
