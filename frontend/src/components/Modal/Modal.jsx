import { useState } from "react";
import PropTypes from "prop-types";
import * as S from "./Modal.styled";
function Modal({ context }) {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <S.ModalContainer>
            <S.Modal>
                <S.CloseButton onClick={handleClose}>닫기</S.CloseButton>
                {context}
            </S.Modal>
        </S.ModalContainer>
    );
}

Modal.propTypes = {
    context: PropTypes.node.isRequired,
};

export default Modal;
