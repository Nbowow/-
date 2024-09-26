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
`;

export const ImageUpload = styled.div`
    grid-area: image;
    width: 400px;
    height: 400px;
    border: 1px dashed #ccc;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-bottom: 20px;
    margin-left: 100px;
`;
export const ButtonContainer = styled.div`
    text-align: center; /* 텍스트 중앙 정렬 */
`;

export const TextArea = styled.textarea`
    grid-area: content;
    width: 400px;
    height: 300px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
    margin-bottom: 10px;
`;

export const Input = styled.input`
    grid-area: tool;
    width: 400px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 20px;
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
    font-size: 16px;
    color: #aaaaaa;
    margin-top: 10px;
`;
