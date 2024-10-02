import styled from "styled-components";

export const ModifyUserInfoForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 65%;
    margin: 0 auto;
    align-items: center;
`;
export const InputFormContainer = styled.div``;

export const InputForm = styled.div`
    display: flex;
    width: 100%;
    align-items: center;

    gap: 10px;
    height: ${({ height }) => height || "fit-content"};
`;

export const Input = styled.input`
    width: 807px;
    outline: none;
    border-radius: 8px;
    padding: 8px;
    box-sizing: border-box;
    font-family: "SUITRegular";
    border: 1px solid ${({ theme }) => theme.color.gray.light};
`;

export const TextArea = styled.textarea`
    justify-content: center;
    resize: none;
    outline: none;
    width: 807px;
    height: 100%;
    box-sizing: border-box;
    padding: 8px;
    border-radius: 10px;
    font-family: "SUITRegular";
    border: 1px solid ${({ theme }) => theme.color.gray.light};
`;

export const Label = styled.div`
    flex: 1;
    font-family: "SUITSemiBold";
`;
