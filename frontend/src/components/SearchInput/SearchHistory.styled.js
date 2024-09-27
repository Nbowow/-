import styled from "styled-components";

export const HistoryContainer = styled.div`
    width: 1148px;

    display: flex;
    justify-content: space-between;
    height: 50px;

    font-family: "SUITMedium";
    font-size: ${({ theme }) => theme.fontSize.h4};

    margin-top: ${({ theme }) => theme.fontSize.text};
    padding-left: 18px;
    padding-right: 18px;

    box-sizing: border-box;
    align-items: center;

    gap: 100px;
`;

export const History = styled.div`
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
`;

export const DeleteButton = styled.div`
    width: 50px;
    height: 50px;

    display: flex;
    justify-content: center;
    align-items: center;

    background: none;
    border: none;
    cursor: pointer;
    font-family: "SUITMedium";
    font-size: ${({ theme }) => theme.fontSize.h4};
    color: ${({ theme }) => theme.color.gray.light};
`;
