import * as S from "./SubmitButton.styled";
import PropTypes from "prop-types";

/**
 * SubmitButton 컴포넌트
 *
 * 텍스트와 클릭 핸들러를 받아 버튼을 렌더링합니다.
 * 또한 너비(`width`)와 높이(`height`)를 props로 받아 버튼의 크기를 설정하며,
 * props가 전달되지 않을 경우 기본적으로 `100px`의 너비와 `40px`의 높이를 가집니다.
 *
 * @component
 * @example
 * return (
 *   <SubmitButton text="제출하기" onClick={handleSubmit} width="150px" height="50px" />
 * )
 *
 * @param {Object} props - SubmitButton의 props
 * @param {string} props.text - 버튼에 표시될 텍스트
 * @param {function} props.onClick - 버튼 클릭 시 호출될 함수
 * @param {string} [props.width="100px"] - 버튼의 너비 (optional)
 * @param {string} [props.height="40px"] - 버튼의 높이 (optional)
 * @returns {JSX.Element} SubmitButton 컴포넌트
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
