import * as S from "./CardToggle.styled";
import { useState } from "react";
import { getButtonIcon } from "../../../util/get-button-icon";
import PropTypes from "prop-types";

/**
 * CardToggle 컴포넌트
 * 기본 높이 18px 지정해서 사용가능
 *
 * @component
 *
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.type - 버튼의 유형 (bookmark, heart)
 * @param {string} [props.height="18px"] - 아이콘의 높이 (기본값: "18px")
 * @param {boolean} [props.isClicked=false] - 버튼의 초기 클릭 상태 (기본값: false)
 *
 * @returns {JSX.Element} 렌더링된 CardToggle 컴포넌트
 *
 * @example
 * <CardToggle type="bookmark" height="18px" isClicked={false} />
 */
const CardToggle = ({ type, height = "18px", isClicked = false }) => {
    const [isActive, setIsActive] = useState(isClicked);

    const icon = isActive
        ? getButtonIcon(`active_${type}`, height)
        : getButtonIcon(`inactive_${type}`, height);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    return <S.CardToggle onClick={handleClick}>{icon}</S.CardToggle>;
};

CardToggle.propTypes = {
    type: PropTypes.string.isRequired,
    height: PropTypes.string,
    isClicked: PropTypes.bool,
};

export default CardToggle;
