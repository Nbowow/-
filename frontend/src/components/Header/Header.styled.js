import styled from "styled-components";

export const MenuBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: fit-content;
`;

export const LogoImage = styled.img`
    height: 50px;
`;

export const List = styled.ul`
    list-style-type: none;
`;

export const ListItem = styled.li`
    font-family: "SuitSemiBold";
    font-size: ${({ theme }) => theme.fontSize.h3};

    cursor: pointer;
    display: inline-block;
    margin-right: 32px;
`;
