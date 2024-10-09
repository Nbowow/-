import styled from "styled-components";
import { PropTypes } from "prop-types";

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContainer = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    width: 300px;
    height: auto; /* 자동 높이 조정 */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const Message = styled.div`
    margin-bottom: 20px;
    font-size: 16px;
    color: #333;
    font-family: "SUITBoLd";
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
`;

const CloseButton = styled.button`
    padding: 10px 15px;
    background-color: ${({ isError }) => (isError ? "#AAAAAA" : "#4caf50")};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px; /* 버튼 폰트 크기 */
    transition: background-color 0.3s; /* 부드러운 전환 효과 */
    font-family: "SUITRegular";

    &:hover {
        background-color: ${({ isError }) => (isError ? "#AAA" : "#45a049")};
    }
`;

const PostModal = ({ message, onClose, onConfirm, isError }) => {
    return (
        <ModalOverlay>
            <ModalContainer>
                <Message>{message}</Message>
                <ButtonContainer>
                    {isError ? (
                        <CloseButton onClick={onClose} isError={true}>
                            확인
                        </CloseButton> // 실패 시 빨간색 버튼
                    ) : (
                        <>
                            <CloseButton onClick={onConfirm} isError={false}>
                                확인
                            </CloseButton>
                            <CloseButton onClick={onClose}>취소</CloseButton>
                        </>
                    )}
                </ButtonContainer>
            </ModalContainer>
        </ModalOverlay>
    );
};

PostModal.propTypes = {
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    isError: PropTypes.bool,
};

PostModal.defaultProps = {
    isError: false,
};

export default PostModal;
