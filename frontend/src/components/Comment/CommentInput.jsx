import PropTypes from "prop-types";
import * as S from "./Comment.styled";
import { useRef } from "react";
function CommentInput({ addFunc, isReply }) {
    const inputRef = useRef(null);
    const submitComment = () => {
        const input = inputRef.current.value.trim();
        if (!input) return;
        const comment = {
            text: input,
            user: null,
            imgUrl: null,
            date: new Date().toISOString(),
            reply: [],
        };
        addFunc(comment);
        inputRef.current.value = "";
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            submitComment();
        }
    };

    return (
        <S.TextAreaWrapper>
            <S.TextAreaBox
                type="text"
                placeholder="댓글을 입력하세요"
                ref={inputRef}
                onKeyDown={handleKeyPress}
            />
            <S.SubmitButton onClick={submitComment}>등록</S.SubmitButton>
        </S.TextAreaWrapper>
    );
}

CommentInput.propTypes = {
    addFunc: PropTypes.func.isRequired,
    isReply: PropTypes.bool,
};

export default CommentInput;
