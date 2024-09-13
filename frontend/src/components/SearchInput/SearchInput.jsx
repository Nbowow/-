import * as S from "./SearchInput.styled";
import propTypes from "prop-types";

const SearchInput = ({ text }) => {
    return (
        <S.SearchContainer placeholder={text}>
            <div>🔍</div>
            <span>오늘은 무슨 요리를 할까요?</span>
            <span>재료와 요리명으로 추천 레시피를 검색해보세요.</span>
        </S.SearchContainer>
    );
};

SearchInput.propTypes = {
    text: propTypes.string.isRequired,
};

export default SearchInput;
