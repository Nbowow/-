import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;

const StepContainer = styled.div`
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;
`;

const StepList = styled.div`
    flex: 0 0 200px;
    margin-right: 20px;
    border-right: 1px solid #ccc;
    padding-right: 20px;
`;

const StepItem = styled.div`
    margin-bottom: 10px;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #45a049;
    }
`;

const ImagePreview = styled.img`
    width: 100%;
    height: auto;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const InputField = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const UploadButton = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dashed #ccc;
    border-radius: 4px;
    padding: 20px;
    background-color: #fafafa;
    cursor: pointer;
    text-align: center;
    margin: 10px 0;
    transition: background-color 0.3s;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const OrderForm = () => {
    const [orders, setOrders] = useState([
        { content: "", img: null, tools: "" },
    ]);
    const [visibleStep, setVisibleStep] = useState(null);

    const handleContentChange = (index, value) => {
        const newOrders = [...orders];
        newOrders[index].content = value;
        setOrders(newOrders);
    };

    const handleToolsChange = (index, value) => {
        const newOrders = [...orders];
        newOrders[index].tools = value;
        setOrders(newOrders);
    };

    const handleImgChange = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            const newOrders = [...orders];
            newOrders[index].img = file;
            setOrders(newOrders);
        }
    };

    const handleAddOrder = () => {
        setOrders([...orders, { content: "", img: null, tools: "" }]);
    };

    const toggleStepVisibility = (index) => {
        setVisibleStep(visibleStep === index ? null : index);
    };

    return (
        <Container>
            <Title>요리 방법</Title>
            <p style={{ textAlign: "center" }}>
                요리순서에 맞게 사진과 요리방법을 입력해 주세요
            </p>
            <form>
                <StepContainer>
                    <StepList>
                        {orders.map((_, index) => (
                            <StepItem
                                key={index}
                                onClick={() => toggleStepVisibility(index)}
                            >
                                STEP {index + 1}
                            </StepItem>
                        ))}
                        <StepItem onClick={handleAddOrder}>+</StepItem>
                    </StepList>
                    {orders.map(
                        (order, index) =>
                            visibleStep === index && (
                                <div
                                    key={index}
                                    style={{ flex: 1, marginLeft: 20 }}
                                >
                                    <h3>STEP {index + 1}</h3>
                                    <InputField
                                        type="text"
                                        placeholder="조리방법"
                                        value={order.content}
                                        onChange={(e) =>
                                            handleContentChange(
                                                index,
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputField
                                        type="text"
                                        placeholder="조리도구"
                                        value={order.tools}
                                        onChange={(e) =>
                                            handleToolsChange(
                                                index,
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <UploadButton>
                                        {order.img ? (
                                            <>
                                                <ImagePreview
                                                    src={URL.createObjectURL(
                                                        order.img,
                                                    )}
                                                    alt="preview"
                                                />
                                                <span
                                                    onClick={() =>
                                                        handleImgChange(
                                                            index,
                                                            null,
                                                        )
                                                    }
                                                >
                                                    X
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <input
                                                    type="file"
                                                    onChange={(e) =>
                                                        handleImgChange(
                                                            index,
                                                            e,
                                                        )
                                                    }
                                                    style={{ display: "none" }}
                                                />
                                                조리사진 등록
                                            </>
                                        )}
                                    </UploadButton>
                                </div>
                            ),
                    )}
                </StepContainer>
            </form>
        </Container>
    );
};

export default OrderForm;
