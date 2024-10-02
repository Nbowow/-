import styled from "styled-components";

export const ButtonContainer = styled.div`
    display: flex;
    gap: 10px; // 버튼 간의 간격
    justify-content: flex-end;
`;

export const SortButton = styled.button`
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    font-weight: ${(props) => (props.active ? "bold" : null)};
    cursor: pointer;
    font-family: "SUIT";
`;
