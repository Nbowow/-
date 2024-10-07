/* eslint-disable react/prop-types */
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

const OrderForm = ({ orderSteps, setOrderSteps }) => {
    const [activeStep, setActiveStep] = useState(0);

    const handleAddStep = () => {
        const newStep = {
            image: null,
            content: "",
            tools: "",
            orderNum: orderSteps.length + 1,
        };
        setOrderSteps([...orderSteps, newStep]);
        setActiveStep(orderSteps.length);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newSteps = [...orderSteps];
            newSteps[activeStep].image = URL.createObjectURL(file); // 이미지 URL 생성
            setOrderSteps(newSteps);
        }
    };

    const handleContentChange = (event) => {
        const newSteps = [...orderSteps];
        newSteps[activeStep].content = event.target.value;
        setOrderSteps(newSteps);
    };

    const handleToolsChange = (event) => {
        const newSteps = [...orderSteps];
        newSteps[activeStep].tools = event.target.value;
        setOrderSteps(newSteps);
    };

    const handleImageRemove = (e) => {
        e.stopPropagation(); // 이벤트 전파 방지
        const newSteps = [...orderSteps];
        if (newSteps[activeStep].image) {
            URL.revokeObjectURL(newSteps[activeStep].image); // URL 해제
        }
        newSteps[activeStep].image = null;
        setOrderSteps(newSteps);
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
                    {orderSteps.map((_, index) => (
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
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: "none" }}
                                id="imageUpload"
                            />
                            {orderSteps[activeStep]?.image ? (
                                <div style={{ position: "relative" }}>
                                    <img
                                        src={orderSteps[activeStep].image}
                                        alt="조리 과정"
                                        style={{
                                            maxWidth: "100%",
                                            maxHeight: "100%",
                                        }}
                                    />
                                    <RemoveButton onClick={handleImageRemove}>
                                        X
                                    </RemoveButton>
                                </div>
                            ) : (
                                <ButtonContainer>
                                    <img
                                        src="/src/img/Vector.png"
                                        alt="업로드 아이콘"
                                    />
                                    <Text>조리사진 등록</Text>
                                </ButtonContainer>
                            )}
                        </ImageUpload>
                    </ImageContainer>
                    <TextContainer>
                        <Label>조리설명</Label>
                        <TextArea
                            placeholder="ex) 비커에 물과 커피 가루를 넣고 젓는다"
                            value={orderSteps[activeStep]?.content || ""}
                            onChange={handleContentChange}
                        />
                    </TextContainer>
                    <InputContainer>
                        <Label>필요한 도구</Label>
                        <Input
                            type="text"
                            placeholder="ex) 비커, 젓가락"
                            value={orderSteps[activeStep]?.tools || ""}
                            onChange={handleToolsChange}
                        />
                    </InputContainer>
                </ContentArea>
            </FormLayout>
        </Container>
    );
};

export default OrderForm;
