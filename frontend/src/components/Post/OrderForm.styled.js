import styled from "styled-components";

export const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    /* background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); */
`;

export const TitleContainer = styled.div`
    text-align: left;
    margin-bottom: 30px;
`;

export const Title = styled.h1`
    font-size: 34px;
    color: #333;
    margin-bottom: 10px;
    font-family: "SUITEXTRABOLD";
`;

export const SubTitle = styled.p`
    font-size: 22px;
    color: #888;
    font-family: "SUITSEMIBOLD";
`;

export const FormLayout = styled.div`
    display: flex;
    gap: 20px;
`;

export const StepList = styled.div`
    flex: 0 0 120px;
`;

export const StepButton = styled.button`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    background-color: ${(props) => (props.active ? "#4CAF50" : "#E0E0E0")};
    color: ${(props) => (props.active ? "#FFFFFF" : "#333333")};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${(props) => (props.active ? "#45a049" : "#D0D0D0")};
    }
`;

export const ContentArea = styled.div`
    display: grid;
    grid-template-areas:
        "image content"
        "image tool";
    gap: 20px;
    margin-left: 100px;
`;

export const ImageUpload = styled.label`
    width: 400px;
    height: 400px;
    border: 1px dashed #ccc;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-bottom: 20px;
    background-color: #f2f2f2;
`;
export const ButtonContainer = styled.div`
    text-align: center; /* 텍스트 중앙 정렬 */
`;

export const TextArea = styled.textarea`
    width: 400px;
    height: 250px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
    margin-bottom: 10px;
    background-color: #f2f2f2;
    font-family: "SUITREgular";
    font-size: 14px;
`;

export const Input = styled.input`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f2f2f2;
    font-family: "SUITREgular";
    font-size: 14px;
`;

export const SubmitButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #45a049;
    }
`;

export const Text = styled.p`
    font-size: 22px;
    color: #aaaaaa;
    margin-top: 10px;
    font-family: "SUITSEMIBOLD";
`;

export const Label = styled.label`
    margin-bottom: 8px;
    font-family: "SUITSEMIBOLD";
    font-size: 24px;
`;

export const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    grid-area: image;
    gap: 10px;
`;
export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    grid-area: content;
    gap: 10px;
`;
export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    grid-area: tool;
    gap: 10px;
`;

export const RemoveButton = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
    background: none;
    border: none;
    color: red;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        color: darkred;
    }
`;
