import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

function Modal({ context }) {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <MyModal>
            <MyPageModal>
                <CloseButton onClick={handleClose}>닫기</CloseButton>
                {context}
            </MyPageModal>
        </MyModal>
    );
}

Modal.propTypes = {
    context: PropTypes.node.isRequired, // context는 컴포넌트나 JSX로 렌더링 가능한 모든 것
};
export const MyModal = styled.div`
    background-color: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100vh;
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const MyPageModal = styled.div`
    width: 40em;
    height: 30rem;
    background-color: white;
    position: relative;
    border-radius: 10px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
    z-index: 101;
    padding: 20px;
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    color: ${({ theme }) => theme.color.gray.dark};
    &:hover {
        color: ${({ theme }) => theme.color.point.green};
    }
`;

export default Modal;
