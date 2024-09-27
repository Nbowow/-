import styled from "styled-components";

export const Container = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
    display: flex;
    align-items: center;
    font-size: 18px;
    margin-bottom: 15px;
`;

export const CookingIcon = styled.span`
    font-size: 24px;
    margin-right: 10px;
    font-family: "TossFace";
`;

export const ProgressBarContainer = styled.div`
    background-color: #f0f0f0;
    border-radius: 10px;
    height: 10px;
    width: 100%;
`;

export const ProgressBar = styled.div`
    background-color: #ffd700;
    border-radius: 10px;
    height: 100%;
    width: ${(props) => props.progress}%;
`;

export const LevelInfo = styled.p`
    text-align: right;
    font-size: 12px;
    color: #888;
    margin-top: 5px;
`;

export const Text = styled.div`
    font-size: 18px;
    color: #333;
    padding: 8px;
`;
