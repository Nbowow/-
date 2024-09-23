import PropTypes from "prop-types";
import * as S from "./Comment.styled";
function Comment({ setShowReplies, comment, isReply }) {
    const toggleReplies = () => {
        setShowReplies((prev) => !prev);
    };

    const status = comment.reply?.length
        ? `${comment.reply.length}개의 답글`
        : "답글 달기";

    const userImage = comment.imgUrl ? (
        <S.UserImg src={comment.imgUrl} alt={comment.user} />
    ) : (
        <S.UserIcon />
    );

    const replyButton = !isReply ? (
        <S.ReplyButton onClick={toggleReplies}>{status}</S.ReplyButton>
    ) : null;

    return (
        <S.CommentWrapper>
            <S.User>
                {userImage}
                <S.UserName>{comment.user}</S.UserName>
            </S.User>
            <S.Text>{comment.text}</S.Text>
            <S.Info>
                <S.Date>{comment.date}</S.Date>
                {replyButton}
            </S.Info>
        </S.CommentWrapper>
    );
}

Comment.propTypes = {
    comment: PropTypes.shape({
        imgUrl: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        reply: PropTypes.array,
    }).isRequired,
    setShowReplies: PropTypes.func,
    isReply: PropTypes.bool.isRequired,
};

export default Comment;
