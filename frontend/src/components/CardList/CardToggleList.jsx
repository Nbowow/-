import CardToggle from "../Toggle/CardToggle/CardToggle";
import * as S from "./CardList.styled";
import PropTypes from "prop-types";
import { getAllergyImage } from "../../util/get-allergy-image";

const CardToggleList = ({ data }) => {
    return (
        <S.CardList>
            {data.map((item) => (
                <CardToggle
                    key={item.commonCodeId}
                    imgUrl={getAllergyImage(item.commonCodeNum)}
                    text={item.commonCodeName}
                />
            ))}
        </S.CardList>
    );
};

CardToggleList.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            code: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default CardToggleList;
