import * as S from "./SearchInput.styled";
import { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import SearchHistory from "./SearchHistory";
import useSearchHistoryStore from "../../store/searchHistoryStore";

/**
 * SearchInput 컴포넌트
 * 사용자의 아이디와 검색창의 목적에 따라 분류하여 저장하고 화면에 렌더링하는 컴포넌트입니다.
 * 검색 기록은 최대 10개까지 기록합니다.
 *
 * @component
 * @param {Object} props - 컴포넌트에 전달되는 props
 * @param {string} props.userId - 사용자의 ID
 * @param {string} props.purpose - 검색의 목적
 * @param {string} [props.boldPlacehold] - 강조된 placeholder 텍스트
 * @param {string} [props.grayPlaceHold] - 회색 placeholder 텍스트
 * @param {function} props.onSubmit - 검색어가 제출될 때 호출되는 콜백 함수
 * @returns {JSX.Element} 검색 입력창 UI
 *
 * @example
 * const userId = "ssafy";
 * const purpose = "recipe";
 * const boldPlacehold = "오늘은 무슨 요리를 할까요?";
 * const grayPlaceHold = "재료와 요리명으로 추천 레시피를 검색해보세요.";
 * const onSubmit = () => {}
 * return (
 *  <SearchInput
 *      userId={userId}
 *      purpose={purpose}
 *      boldPlaceHold={boldPlacehold}
 *      grayPlaceHold={grayPlaceHold}
 *      onSubmit={onSubmit}
 *  />
 * );
 */
const SearchInput = ({
    userId,
    purpose,
    boldPlacehold,
    grayPlaceHold,
    onSubmit,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const { getSearchTerm, addSearchTerm, removeSearchTerm } =
        useSearchHistoryStore();

    const searchInputRef = useRef(null);
    const inputRef = useRef(null);

    const searchHistory =
        userId && purpose ? getSearchTerm(userId, purpose) : [];

    useEffect(() => {
        const handleOutsideClose = (e) => {
            if (
                searchInputRef.current &&
                !searchInputRef.current.contains(e.target)
            )
                setIsFocused(false);
        };
        document.addEventListener("mousedown", handleOutsideClose);

        return () =>
            document.removeEventListener("mousedown", handleOutsideClose);
    }, [isFocused]);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleSearchInputChange = useCallback((e) => {
        setSearchValue(e.target.value);
    }, []);

    const handleSearchhistoryClick = useCallback(
        (term) => {
            setSearchValue(term);
            onSubmit(term);
        },
        [onSubmit],
    );

    const handleSearchSubmit = useCallback(
        (e) => {
            if (e.key === "Enter" && searchValue.trim()) {
                if (userId) addSearchTerm(userId, purpose, searchValue);
                setIsFocused(false);
                onSubmit(searchValue);
            }
        },
        [searchValue, userId, purpose, addSearchTerm, onSubmit],
    );

    return (
        <S.SearchInput ref={searchInputRef}>
            {isFocused ? (
                <S.SearchFocusContainer>
                    <S.SearchInputForm>
                        <div className="input">
                            <S.Icon>🔍</S.Icon>
                            <input
                                autoFocus
                                value={searchValue}
                                ref={inputRef}
                                onChange={handleSearchInputChange}
                                onKeyDown={handleSearchSubmit}
                            />
                        </div>
                        <S.Line />
                        {searchHistory.map((term, index) => (
                            <SearchHistory
                                key={index}
                                term={term}
                                onClick={() => {
                                    handleSearchhistoryClick(term);
                                }}
                                onButtonClick={() =>
                                    removeSearchTerm(userId, purpose, index)
                                }
                            />
                        ))}
                    </S.SearchInputForm>
                </S.SearchFocusContainer>
            ) : (
                <S.SearchContainer onClick={handleInputFocus}>
                    <S.Icon>🔍</S.Icon>
                    <S.Text>
                        {searchValue ? (
                            <span className="plain">{searchValue}</span>
                        ) : (
                            <>
                                <span className="bold">{boldPlacehold}</span>
                                <span className="gray">{grayPlaceHold}</span>
                            </>
                        )}
                    </S.Text>
                </S.SearchContainer>
            )}
        </S.SearchInput>
    );
};

SearchInput.propTypes = {
    userId: PropTypes.string.isRequired,
    purpose: PropTypes.string.isRequired,
    boldPlacehold: PropTypes.string,
    grayPlaceHold: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
};

export default SearchInput;
