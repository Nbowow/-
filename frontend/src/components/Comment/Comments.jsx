import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import * as S from "./Comment.styled";
import { postComment } from "../../api/recipe";
function Comments({ initComments, id }) {
    const [comments, setComments] = useState([]);

    const addComment = async (newComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
        await postComment(id, newComment.content);
    };

    useEffect(() => {
        setComments(initComments);
    }, [initComments]);

    return (
        <>
            <S.CommentInputWrapper>
                <CommentInput addFunc={addComment} />
            </S.CommentInputWrapper>
            {comments.map((comment, index) => (
                <S.CommentsWrapper key={comment.id}>
                    <Comment comment={comment} />
                </S.CommentsWrapper>
            ))}
        </>
    );
}

Comments.propTypes = {
    initComments: PropTypes.array.isRequired,
    id: PropTypes.number.isRequired,
};

export default Comments;
