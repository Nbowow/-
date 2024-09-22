import * as S from "./IntroCard.styled";
import PropTypes from "prop-types";

const IntroCard = ({ imgUrl, title, text }) => {
    const placeholderImage = "/images/placeholder-img.jpg";

    return (
        <S.IntroCard>
            <S.Thumnail
                src={imgUrl || placeholderImage}
                onError={(e) =>
                    (e.target.src = e.target.src = placeholderImage)
                }
            />
            <S.TextArea>
                <S.Title>{title}</S.Title>
                <S.Text>{text}</S.Text>
            </S.TextArea>
        </S.IntroCard>
    );
};

IntroCard.propTypes = {
    imgUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

IntroCard.defaultProps = {
    imgUrl: "",
};

export default IntroCard;
