import * as S from "./CardToggle.styled";
import PropTypes from "prop-types";
import { useState } from "react";

const CardToggle = ({ imgUrl, text, isClicked = false }) => {
    const [isActive, setIsActive] = useState(isClicked);

    return (
        <S.CardToggle
            isActive={isActive}
            onClick={() => setIsActive(!isActive)}
        >
            <S.Image src={imgUrl} />
            <S.Text>{text}</S.Text>
        </S.CardToggle>
    );
};

CardToggle.propTypes = {
    imgUrl: PropTypes.string,
    text: PropTypes.string,
    isClicked: PropTypes.bool,
};

export default CardToggle;
