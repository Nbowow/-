import { useState } from "react";
import PropTypes from "prop-types";
import Comment from "./Comment";
import CommentReply from "./CommentReply";
import CommentInput from "./CommentInput";
import * as S from "./Comment.styled";
function Comments({ comments: initialComments }) {
    const [showReplies, setShowReplies] = useState({});
    const [comments, setComments] = useState(initialComments);

    const addComment = (newComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
    };

    const toggleReplies = (index) => {
        setShowReplies((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <>
            <CommentInput addFunc={addComment} />
            {comments.map((comment, index) => (
                <S.CommentsWrapper key={comment.id}>
                    <Comment
                        setShowReplies={() => toggleReplies(index)}
                        isReply={false}
                        comment={comment}
                    />
                    {showReplies[index] && comment.reply && (
                        <CommentReply replies={comment.reply} />
                    )}
                </S.CommentsWrapper>
            ))}
        </>
    );
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired,
};

export default Comments;
