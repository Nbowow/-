import * as S from "./SubmitButton.styled";
import PropTypes from "prop-types";

const SubmitButton = ({ text, onClick, width, height }) => {
    return (
        <>
            <S.SubmitButton onClick={onClick} width={width} height={height}>
                {text}
            </S.SubmitButton>
        </>
    );
};

SubmitButton.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    width: PropTypes.string,
    height: PropTypes.string,
};

export default SubmitButton;
