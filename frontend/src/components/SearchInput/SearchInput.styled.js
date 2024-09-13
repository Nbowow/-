import styled from "styled-components";

export const SearchContainer = styled.div`
    position: relative;
    width: 1250px;
    height: 110px;

    border: 1px solid ${({ theme }) => theme.color.gray.lighter};
    border-radius: 100px;

    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);

    padding-left: 70px;

    display: flex;
    align-items: center;
`;
