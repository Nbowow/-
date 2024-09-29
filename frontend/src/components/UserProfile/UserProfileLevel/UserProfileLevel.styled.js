import styled from "styled-components";

export const Container = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 30px;

    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.05);

    border: 0.01rem solid ${({ theme }) => theme.color.gray.lighter};
    width: 70%;
    margin: 0 auto;
`;

export const Title = styled.h2`
    display: flex;
    align-items: center;
    font-family: "SUITSemibold";
    font-size: ${({ theme }) => theme.fontSize.h4};
    margin-bottom: 15px;
`;

export const CookingIcon = styled.span`
    font-size: 24px;
    margin-right: 10px;
    font-family: "TossFace";
`;

export const ProgressBarWrapper = styled.div`
    width: 95%;
    margin: 0 auto;
`;

export const ProgressBarContainer = styled.div`
    background-color: #f0f0f0;
    border-radius: 10px;
    height: 10px;
    width: 100%;
`;

export const ProgressBar = styled.div`
    background-color: ${({ theme }) => theme.color.point.yellow};
    border-radius: 10px;
    height: 100%;
    width: ${({ progress }) => progress}%;
`;

export const LevelInfo = styled.p`
    text-align: right;
    font-size: ${({ theme }) => theme.fontSize.subText};
    color: ${({ theme }) => theme.color.gray.light};
    margin-top: 5px;
`;

export const Text = styled.div`
    font-family: "SUITMedium";
    font-size: ${({ theme }) => theme.fontSize.text};
    padding: 8px;
`;
