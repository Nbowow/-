import * as S from "./SearchInput.styled";

const SearchInput = () => {
    return (
        <S.SearchContainer>
            <S.Icon>🔍</S.Icon>
            <S.Text>
                <span className="bold">오늘은 무슨 요리를 할까요?</span>
                <span className="gray">
                    재료와 요리명으로 추천 레시피를 검색해보세요.
                </span>
            </S.Text>
        </S.SearchContainer>
    );
};

export default SearchInput;
