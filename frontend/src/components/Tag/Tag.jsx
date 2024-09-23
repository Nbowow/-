import PropTypes from "prop-types";
import * as S from "./Tag.styled";

const emoji = {
    간식: "🍡",
    초스피드: "✈️",
};

/**
 * Tag 컴포넌트
 *
 * 주어진 태그에 해당하는 텍스트와 이모지를 렌더링하는 컴포넌트입니다.
 * `emoji` 객체에서 미리 정의된 태그에 맞는 이모지를 표시하며, 태그에 맞는 이모지가 없을 경우 표시되지 않습니다.
 *
 * @component
 * @example
 * return <Tag tag="간식" />
 *
 * @param {Object} props - Tag 컴포넌트의 props
 * @param {string} props.tag - 렌더링할 태그의 이름 (필수)
 * @returns {JSX.Element} Tag 컴포넌트
 */
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
