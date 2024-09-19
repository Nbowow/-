import styled from "styled-components";

// TODO: 클릭시 쌈무 그린으로 변경
// TODO: 크기별 버튼 만들기
export const SubmitButton = styled.button`
    border: none;
    border-radius: 4px;

    width: 150px;
    height: 40px;

    color: white;
    background-color: ${({ theme }) => theme.color.point.green};
    padding: 5px;

    cursor: pointer;

    &:hover {
        background-color: #65e68a;
    }
`;
