import PropTypes from "prop-types";
import * as S from "./Tag.styled";

const emoji = {
    간식: "🍡",
    초스피드: "✈️",
};

function Tag({ tag }) {
    return (
        <S.TagWrapper>
            <S.TagName>{tag}</S.TagName>
            <S.TagEmoji> {emoji[tag]}</S.TagEmoji>
        </S.TagWrapper>
    );
}

Tag.propTypes = {
    tag: PropTypes.string.isRequired,
};
export default Tag;
