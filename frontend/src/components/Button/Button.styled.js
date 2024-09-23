import styled from "styled-components";

export const Button = styled.button`
    border: none;
    border-radius: 4px;

    width: ${({ width }) => width || "100px"};
    height: ${({ height }) => height || "40px"};

    color: white;
    background-color: ${({ theme }) => theme.color.point.green};
    padding: 10px;

    font-family: "SUITMedium";
    font-size: ${({ theme }) => theme.fontSize.text};

    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #3e8d55;
    }

    &:active {
        background-color: #367a4a;
    }
`;
