import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import * as S from "./Comment.styled";
import { getComments, postComment } from "../../api/recipe";
function Comments({ id }) {
    const [comments, setComments] = useState([]);

    const addComment = async (newComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
        await postComment(id, newComment.content);
    };

    useEffect(() => {
        const fetchComment = async () => {
            const data = await getComments(id);
            setComments(data);
        };
        fetchComment(id);
    }, [id]);

    return (
        <>
            <S.CommentTitle>댓글 {comments.length}개</S.CommentTitle>
            <S.CommentInputWrapper>
                <CommentInput addFunc={addComment} />
            </S.CommentInputWrapper>
            {comments && (
                <>
                    {comments.map((comment) => (
                        <S.CommentsWrapper key={comment.id}>
                            <Comment comment={comment} />
                        </S.CommentsWrapper>
                    ))}
                </>
            )}
        </>
    );
}

Comments.propTypes = {
    id: PropTypes.number.isRequired,
};

export default Comments;
