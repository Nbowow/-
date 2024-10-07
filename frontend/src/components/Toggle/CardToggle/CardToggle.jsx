import * as S from "./CardToggle.styled";
import PropTypes from "prop-types";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addAllergy, deleteAllergy } from "../../../api/userApi";

const CardToggle = ({ imgUrl, code, text, isClicked = false }) => {
    const [isActive, setIsActive] = useState(isClicked);

    // TODO: 서버에 잘 올라가는지 테스트 필요!!!!!!!!!!!!!!!!
    const addAllergyMutation = useMutation((allergyCode) =>
        addAllergy(allergyCode),
    );

    const deleteAllergyMutation = useMutation((allergyCode) =>
        deleteAllergy(allergyCode),
    );

    const handleOnClick = () => {
        setIsActive(!isActive);

        if (isActive) {
            addAllergyMutation.mutate(code);
        } else {
            deleteAllergyMutation.mutate(code);
        }
    };

    return (
        <S.CardToggle isActive={isActive} onClick={handleOnClick}>
            <S.Image src={imgUrl} />
            <S.Text>{text}</S.Text>
        </S.CardToggle>
    );
};

CardToggle.propTypes = {
    code: PropTypes.string,
    imgUrl: PropTypes.string,
    text: PropTypes.string,
    isClicked: PropTypes.bool,
};

export default CardToggle;
