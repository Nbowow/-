import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
`;

export const PopularRecipe = styled.h2`
    font-family: "SUITEXTRABOLD";
    padding: 20px;
    margin-left: 50px;
    font-size: ${({ theme }) => theme.fontSize?.h3 || "24px"};
`;

export const Emoji = styled.span`
    font-family: "tossface";
`;

export const NoResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    padding: 40px;
`;

export const NoResult = styled.h2`
    font-family: "SUITBOLD";
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: ${({ theme }) => theme.fontSize?.h4 || "24px"};
`;

export const NoResultSearch = styled.div`
    font-family: "SUITEXTRABOLD";
    padding: 20px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors?.primary || "#0066ff"};

    &:hover {
        text-decoration: underline;
    }
`;
