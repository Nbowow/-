import * as S from "./SubmitButton.styled";
import PropTypes from "prop-types";

/**
 * SubmitButton 컴포넌트
 *
 * 너비와 높이를 props로 받아서 쓰는 컴포넌트, 입력하지 않으면 100px, 40px 고정
 *
 * @param {*} param0
 * @returns
 */
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
