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
    margin: 10px 0;
`;

export const CategoryTitle = styled.h3`
    font-size: 1.5em;
    text-align: center;
    background-color: #4cac67;
    padding: 20px;
    color: white;
`;

export const CategoryList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

export const CategoryItem = styled.div`
    border-radius: 10px;
    padding: 20px;
    margin: 5px;
    text-align: center;
    cursor: pointer;
    font-weight: ${(props) => (props.selected ? "bold" : "normal")};
`;
