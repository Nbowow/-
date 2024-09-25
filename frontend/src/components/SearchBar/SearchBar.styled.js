import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 20px;
    position: relative;
`;

export const SearchInput = styled.input`
    width: 550px;
    height: 40px;
    padding: 0 15px;
    border: 1px solid #dfe1e5;
    border-radius: 24px;
    box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
    font-size: 16px;
    outline: none;

    &:focus {
        border: 1px solid #4285f4;
        box-shadow: 0 1px 6px rgba(32, 33, 36, 0.4);
    }
`;

export const SearchButton = styled.button`
    margin-left: 10px;
    width: 100px;
    height: 40px;
    background-color: #f8f9fa;
    border: 1px solid #dfe1e5;
    border-radius: 4px;
    font-size: 14px;
    color: #5f6368;
    cursor: pointer;

    &:hover {
        background-color: #f1f3f4;
        border-color: #dadce0;
    }
`;

export const Dropdown = styled.ul`
    position: absolute;
    top: 45px;
    width: 550px;
    background-color: white;
    border: 1px solid #dfe1e5;
    border-radius: 0 0 24px 24px;
    box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
    list-style-type: none;
    padding: 0;
    margin: 0;
    max-height: 200px;
    overflow-y: auto;
`;

export const DropdownItem = styled.li`
    padding: 10px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: #f1f3f4;
    }
`;
