import { useState } from "react";
import {
    Container,
    Title,
    SubTitle,
    FormLayout,
    StepList,
    StepButton,
    ContentArea,
    ImageUpload,
    TextArea,
    Input,
    TitleContainer,
    ButtonContainer,
    Text,
    Label,
    InputContainer,
    ImageContainer,
    TextContainer,
    RemoveButton,
} from "./OrderForm.styled";

const OrderForm = () => {
    const [steps, setSteps] = useState([
        { image: null, content: "", tools: "" },
    ]);
    const [activeStep, setActiveStep] = useState(0);

    const handleAddStep = () => {
        setSteps([...steps, { image: null, content: "", tools: "" }]);
        setActiveStep(steps.length);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newSteps = [...steps];
            newSteps[activeStep].image = URL.createObjectURL(file);
            setSteps(newSteps);
        }
    };

    const handleContentChange = (event) => {
        const newSteps = [...steps];
        newSteps[activeStep].content = event.target.value;
        setSteps(newSteps);
    };

    const handleToolsChange = (event) => {
        const newSteps = [...steps];
        newSteps[activeStep].tools = event.target.value;
        setSteps(newSteps);
    };

    const handleImageRemove = () => {
        const newSteps = [...steps];
        newSteps[activeStep].image = null; // 이미지 제거
        setSteps(newSteps);
    };

    return (
        <Container>
            <TitleContainer>
                <Title>요리 방법</Title>
                <SubTitle>
                    요리순서에 맞게 사진과 요리방법을 입력해 주세요
                </SubTitle>
            </TitleContainer>
            <FormLayout>
                <StepList>
                    {steps.map((_, index) => (
                        <StepButton
                            key={index}
                            active={activeStep === index}
                            onClick={() => setActiveStep(index)}
                        >
                            STEP {index + 1}
                        </StepButton>
                    ))}
                    <StepButton onClick={handleAddStep}>+</StepButton>
                </StepList>
                <ContentArea>
                    <ImageContainer>
                        <Label>조리사진</Label>
                        <ImageUpload
                            onClick={() =>
                                document.getElementById("imageUpload").click()
                            }
                        >
                            <input
                                type="file"
                                onChange={handleImageUpload}
                                style={{ display: "none" }}
                                id="imageUpload"
                            />
                            {steps[activeStep].image ? (
                                <div style={{ position: "relative" }}>
                                    <img
                                        src={steps[activeStep].image}
                                        alt="조리 과정"
                                        style={{
                                            maxWidth: "100%",
                                            maxHeight: "100%",
                                        }}
                                    />
                                    <RemoveButton
                                        onClick={(e) => {
                                            e.stopPropagation(); // 클릭 이벤트 전파 방지
                                            handleImageRemove();
                                        }}
                                    >
                                        X
                                    </RemoveButton>
                                </div>
                            ) : (
                                <ButtonContainer>
                                    <img src="/src/img/Vector.png" alt="" />
                                    <Text>조리사진 등록</Text>
                                </ButtonContainer>
                            )}
                        </ImageUpload>
                    </ImageContainer>
                    <TextContainer>
                        <Label>조리설명</Label>
                        <TextArea
                            placeholder="ex) 비커에 물과 커피 가루를 넣고 젓는다"
                            value={steps[activeStep].content}
                            onChange={handleContentChange}
                        />
                    </TextContainer>
                    <InputContainer>
                        <Label>필요한 도구</Label>
                        <Input
                            type="text"
                            placeholder="ex) 비커, 젓가락"
                            value={steps[activeStep].tools}
                            onChange={handleToolsChange}
                        />
                    </InputContainer>
                </ContentArea>
            </FormLayout>
        </Container>
    );
};

export default OrderForm;
