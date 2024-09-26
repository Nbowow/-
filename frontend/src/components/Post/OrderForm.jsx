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
                    <ImageUpload>
                        {steps[activeStep].image ? (
                            <img
                                src={steps[activeStep].image}
                                alt="조리 과정"
                                style={{ maxWidth: "100%", maxHeight: "100%" }}
                            />
                        ) : (
                            <>
                                <input
                                    type="file"
                                    onChange={handleImageUpload}
                                    style={{ display: "none" }}
                                    id="imageUpload"
                                />

                                <label htmlFor="imageUpload">
                                    <ButtonContainer>
                                        <img src="/src/img/Vector.png" alt="" />
                                        <Text>조리사진 등록</Text>
                                    </ButtonContainer>
                                </label>
                            </>
                        )}
                    </ImageUpload>
                    <TextArea
                        placeholder="ex) 비커에 물과 커피 가루를 넣고 젓는다"
                        value={steps[activeStep].content}
                        onChange={handleContentChange}
                    />
                    <Input
                        type="text"
                        placeholder="ex) 비커, 젓가락"
                        value={steps[activeStep].tools}
                        onChange={handleToolsChange}
                    />
                </ContentArea>
            </FormLayout>
        </Container>
    );
};

export default OrderForm;
