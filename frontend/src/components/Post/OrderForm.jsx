import { useState } from "react";
import PropTypes from "prop-types"; // PropTypes 추가
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
    TitleContainer,
    ButtonContainer,
    Text,
    Label,
    ImageContainer,
    TextContainer,
    RemoveButton,
    ImagePreview,
    ImageContainer2,
} from "./OrderForm.styled";

const OrderForm = ({ orderSteps, setOrderSteps }) => {
    const [activeStep, setActiveStep] = useState(0);

    const handleAddStep = () => {
        const newStep = {
            image: null,
            content: "",
            orderNum: orderSteps.length + 1,
        };
        setOrderSteps([...orderSteps, newStep]);
        setActiveStep(orderSteps.length);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newSteps = [...orderSteps];
            newSteps[activeStep].image = file;
            setOrderSteps(newSteps);
        }
    };

    // 조리 설명 변경
    const handleContentChange = (event) => {
        const newSteps = [...orderSteps];
        newSteps[activeStep].content = event.target.value;
        setOrderSteps(newSteps);
    };

    const handleImageRemove = (e) => {
        e.stopPropagation();
        const newSteps = [...orderSteps];
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
                        {orderSteps[activeStep]?.image ? (
                            <ImageContainer2>
                                <ImagePreview
                                    src={URL.createObjectURL(
                                        orderSteps[activeStep].image,
                                    )} // 임시 URL 생성
                                    alt="조리 과정"
                                />
                                <RemoveButton onClick={handleImageRemove}>
                                    X
                                </RemoveButton>
                            </ImageContainer2>
                        ) : (
                            <ImageUpload
                                onClick={() =>
                                    document
                                        .getElementById("imageUpload")
                                        .click()
                                }
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ display: "none" }}
                                    id="imageUpload"
                                />
                                <ButtonContainer>
                                    <img
                                        src="/src/img/Vector.png"
                                        alt="업로드 아이콘"
                                    />
                                    <Text>조리사진 등록</Text>
                                </ButtonContainer>
                            </ImageUpload>
                        )}
                    </ImageContainer>

                    <TextContainer>
                        <Label>조리설명</Label>
                        <TextArea
                            placeholder="ex) 비커에 물과 커피 가루를 넣고 젓는다"
                            value={orderSteps[activeStep]?.content || ""}
                            onChange={handleContentChange}
                        />
                    </TextContainer>
                </ContentArea>
            </FormLayout>
        </Container>
    );
};

// PropTypes 추가
OrderForm.propTypes = {
    orderSteps: PropTypes.arrayOf(
        PropTypes.shape({
            image: PropTypes.instanceOf(File),
            content: PropTypes.string.isRequired,
            orderNum: PropTypes.number.isRequired,
        }),
    ).isRequired,
    setOrderSteps: PropTypes.func.isRequired,
};

export default OrderForm;
