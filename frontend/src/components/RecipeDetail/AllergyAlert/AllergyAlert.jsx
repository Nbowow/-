import PropTypes from "prop-types";
import * as S from "./AllergyAlert.styled";
const AllergyAlert = ({ allergies }) => {
    //   const mock = ["토마토", "우유"];
    return (
        <S.Wrapper>
            <S.Emoji> 🚨 </S.Emoji>
            <S.Allergy>
                {allergies.map((allergy, idx) => (
                    <div key={allergy}>
                        {allergy}
                        {idx !== allergies.length - 1 && ", "}
                    </div>
                ))}
            </S.Allergy>
            <span> 알레르기를 조심하세요 !</span>
        </S.Wrapper>
    );
};

AllergyAlert.propTypes = {
    allergies: PropTypes.array.isRequired,
};

export default AllergyAlert;
