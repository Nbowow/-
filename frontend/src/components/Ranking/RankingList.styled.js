import styled from "styled-components";

export const Container = styled.div`
    padding: 20px;
    position: relative;
`;

export const SearchInput = styled.input`
    margin-bottom: 20px;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    overflow: hidden;
`;

export const Th = styled.th`
    background-color: #eaf0ec;
    padding: 15px;
    text-align: left;
    color: black;
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSize.h4};
    font-family: "SUITSEMIBOLD";
`;

export const Td = styled.td`
    padding: 15px;
    text-align: left;
    background-color: rgba(255, 255, 255, 0.2);
    color: black;
    font-size: ${({ theme }) => theme.fontSize.h2};
    font-family: "SUITSEMIBOLD";

    &:hover {
        background-color: rgba(255, 255, 255, 0.3);
    }
`;

export const UserImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
`;
