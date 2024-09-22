import * as S from "./IntroCard.styled";
import PropTypes from "prop-types";

const IntroCard = ({ imgUrl, title, text }) => {
    const placeholderImage = "/images/placeholder-img.jpg";

    const handleError = (e) => {
        e.target.src = placeholderImage;
    };

    return (
        <S.IntroCard>
            <S.Thumnail src={imgUrl} onError={handleError} />
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

export default IntroCard;
