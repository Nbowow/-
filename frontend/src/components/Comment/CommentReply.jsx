import Comment from "./Comment";
import CommentInput from "./CommentInput";
import PropTypes from "prop-types";
import * as S from "./Comment.styled";
import { useState } from "react";
function CommentReply({ replies: initialReplies }) {
    const [replies, setReplies] = useState(initialReplies);

    const addReply = (newReply) => {
        setReplies((prevReplies) => [...prevReplies, newReply]);
    };

    return (
        <S.ReplyWrapper>
            {replies.map((reply, index) => (
                <Comment key={index} isReply={true} comment={reply} />
            ))}
            <CommentInput addFunc={addReply} isReply={true} />
        </S.ReplyWrapper>
    );
}

CommentReply.propTypes = {
    replies: PropTypes.array.isRequired,
};

export default CommentReply;
