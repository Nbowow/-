import PropTypes from "prop-types";
import * as S from "./Comment.styled";
import { useUserStore } from "../../store/userStore";
import { useRef } from "react";
function CommentInput({ addFunc }) {
    const { isLoading } = useUserStore();
    const user = useUserStore((state) => state.user);
    const inputRef = useRef(null);

    if (isLoading) return <div></div>;

    const submitComment = () => {
        const input = inputRef.current.value.trim();
        if (!input || !user) return;
        const comment = {
            nickname: user.nickname,
            content: input,
            profileImage: user.profileImage,
            createdDate: new Date().toISOString(),
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
};

export default CommentInput;
