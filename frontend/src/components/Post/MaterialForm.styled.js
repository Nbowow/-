import styled from "styled-components";

export const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const TitleContainer = styled.div`
    text-align: left;
    margin-bottom: 30px;
`;

export const Title = styled.h1`
    font-size: 34px;
    color: #333;
    margin-bottom: 10px;
`;

export const SubTitle = styled.p`
    font-size: 16px;
    color: #888;
`;

export const GroupContainer = styled.div`
    margin-bottom: 30px;
    justify-content: center;
`;

export const InputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;

export const InputField = styled.input`
    flex: 1;
    padding: 12px;
    margin-right: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-size: 14px;

    &:last-child {
        margin-right: 0;
    }

    &::placeholder {
        color: #bbb;
    }
`;

export const GroupLabel = styled(InputField)`
    background-color: #4caf50;
    color: white;
    border: none;
    font-weight: bold;
    margin-bottom: 10px;

    &::placeholder {
        color: rgba(255, 255, 255, 0.8);
    }
`;
export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const AddButton = styled.button`
    background-color: #f0f0f0;
    color: #333;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    width: 50%;
    margin-top: 10px;

    &:hover {
        background-color: #e0e0e0;
    }
`;

export const AddGroupButton = styled(AddButton)`
    background-color: white;
    border: 2px dashed #ccc;
    color: #888;
    margin-top: 20px;

    &:hover {
        background-color: #f9f9f9;
    }
`;

export const FormLayout = styled.div`
    display: flex;
    gap: 20px;
`;
