import * as S from "./CardToggle.styled";
import { useState } from "react";
import { getButtonIcon } from "../../../util/get-button-icon";
import PropTypes from "prop-types";

const CardToggle = ({ type, height = "18px", isClicked = false }) => {
    type = "bookmark";
    height = "18px";

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
