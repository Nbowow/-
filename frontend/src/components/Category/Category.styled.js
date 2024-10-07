// StyledComponents.js
import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    width: 1440px;
`;

export const CategorySection = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
`;

export const CategoryTitle = styled.h3`
    font-size: ${({ theme }) => theme.fontSize.h3};
    text-align: center;
    background-color: #4cac67;
    padding: 20px;
    color: white;
    font-family: "SUITSemiBold";
    margin-right: 10px;
    margin-left: 30px;
`;

export const CategoryList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

export const CategoryItem = styled.div`
    border-radius: 10px;
    margin: 5px;
    text-align: center;
    cursor: pointer;
    font-family: ${(props) =>
        props.selected ? "SUITExtraBold" : "SUITregular"};

    color: ${(props) =>
        props.selected ? "black" : props.theme.color.gray.dark};
`;
