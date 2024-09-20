import styled from "styled-components";

export const StepWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 8rem;
    margin-top: 1rem;
`;
export const StepContainer = styled.div`
    width: 70%;
`;
export const CircleNumber = styled.div`
    background-color: ${({ theme }) => theme.color.point.green};
    font-family: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSize.h5};
    color: white;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
`;

export const StepDescription = styled.div`
    font-family: ${({ theme }) => theme.fontWeight.medium};
    font-size: ${({ theme }) => theme.fontSize.h5};
    background-color: ${({ theme }) => theme.color.point.lightGreen};
    margin-left: 1rem;
    height: 100%;
    width: 50%;
    border-radius: 0 2rem 2rem 2rem;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 1rem;
    box-sizing: border-box;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const StepImage = styled.img`
    margin-left: 1rem;
    height: 100%;
    width: 10%;
    border-radius: 0.8rem;
    object-fit: cover;
`;
