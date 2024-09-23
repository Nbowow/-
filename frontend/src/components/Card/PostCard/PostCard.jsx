import ActionToggleGroup from "../../Toggle/ActionToggleGroup/ActionToggleGroup";
import * as S from "./PostCard.styled";
import PropTypes from "prop-types";

const PostCard = ({ postId, imgUrl, title, text }) => {
    const placeholderImage = "/images/placeholder-img.jpg";

    return (
        <S.PostCard>
            <S.Thumnail src={imgUrl || placeholderImage} />
            <S.TextArea>
                <ActionToggleGroup />
                <S.Title>{title}</S.Title>
                <S.Text>{text}</S.Text>
            </S.TextArea>
        </S.PostCard>
    );
};

PostCard.propTypes = {
    postId: PropTypes.number.isRequired,
    imgUrl: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
};

export default PostCard;
