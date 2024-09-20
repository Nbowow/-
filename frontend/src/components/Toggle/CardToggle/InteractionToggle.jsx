import * as S from "./InteractionToggle.styled";
import PropTypes from "prop-types";

import { useState } from "react";
import {
    ActiveHeartToggle,
    InactiveHeartToggle,
    ActiveBookmarkToggle,
    InactiveBookmarkToggle,
} from "../../../util/get-button-icon";

/**
 * InteractionToggle 컴포넌트는 하트 또는 북마크 아이콘을 토글하는 버튼입니다.
 *
 * @component
 * @param {Object} props - 컴포넌트에 전달되는 props.
 * @param {"heart" | "bookmark"} props.type - 토글 아이콘의 타입 ("heart" 또는 "bookmark").
 * @param {string} [props.size="20px"] - 아이콘의 크기 (기본값: "20px").
 * @param {boolean} [props.active=false] - 초기 활성화 상태 (기본값: false).
 * @returns {JSX.Element} - InteractionToggle 컴포넌트.
 *
 * @example
 * <InteractionToggle type="heart" size="30px" active={true} />
 */
const InteractionToggle = ({ type, size, active }) => {
    const [isActive, setIsActive] = useState(active);

    const ActiveToggle = () => {
        switch (type) {
            case "heart":
                return <ActiveHeartToggle size={size} />;
            case "bookmark":
                return <ActiveBookmarkToggle size={size} />;
            default:
                return <div></div>;
        }
    };

    const InActiveToggle = () => {
        switch (type) {
            case "heart":
                return <InactiveHeartToggle size={size} />;
            case "bookmark":
                return <InactiveBookmarkToggle size={size} />;
            default:
                return <div></div>;
        }
    };

    const handleClick = () => {
        setIsActive(!isActive);
    };

    return (
        <S.InteractionToggle onClick={handleClick}>
            {isActive ? <ActiveToggle /> : <InActiveToggle />}
        </S.InteractionToggle>
    );
};

InteractionToggle.propTypes = {
    type: PropTypes.string.isRequired,
    size: PropTypes.string,
    active: PropTypes.bool,
};

export default InteractionToggle;
