import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import useSearchHistoryStore from "../../store/searchHistoryStore";
import * as S from "./SearchBar.styled";

const SearchBar = ({
    userId,
    purpose,
    boldPlacehold,
    grayPlacehold,
    onSubmit,
    value,
}) => {
    const [searchTerm, setSearchTerm] = useState(value || ""); // 초기값 설정
    const [showDropDown, setShowDropDown] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1); // 현재 선택된 인덱스
    const { getSearchTerm, addSearchTerm, removeSearchTerm } =
        useSearchHistoryStore();

    const searchBarRef = useRef(null);

    const searchHistory = useMemo(() => {
        return purpose ? getSearchTerm(userId, purpose) : [];
    }, [userId, purpose, getSearchTerm]);

    useEffect(() => {
        setSearchTerm(value); // 부모 컴포넌트에서 검색어가 바뀌면 상태 업데이트
    }, [value]);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (
                searchBarRef.current &&
                !searchBarRef.current.contains(e.target)
            ) {
                setShowDropDown(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () =>
            document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    const onClickSearchBar = () => {
        setShowDropDown(true);
    };

    const onChangeInput = (e) => {
        setSearchTerm(e.target.value);
        setShowDropDown(true);
        setHighlightedIndex(-1); // 입력 시 선택된 인덱스 초기화
    };

    const handleSearchSubmit = useCallback(
        (term) => {
            if (!term.trim()) return;

            if (userId) addSearchTerm(userId, purpose, term);
            setShowDropDown(false);
            setSearchTerm(term);
            if (onSubmit) {
                onSubmit(term.trim());
            }
        },
        [userId, purpose, onSubmit, addSearchTerm],
    );

    const onClickHistory = (term) => {
        handleSearchSubmit(term);
    };

    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                if (highlightedIndex >= 0) {
                    handleSearchSubmit(searchHistory[highlightedIndex]);
                } else {
                    handleSearchSubmit(searchTerm);
                }
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                setHighlightedIndex((prevIndex) =>
                    Math.min(prevIndex + 1, searchHistory.length - 1),
                );
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, -1));
            }
        },
        [searchTerm, highlightedIndex, searchHistory, handleSearchSubmit],
    );

    const Placeholder = () => {
        if (!searchTerm) {
            return (
                <>
                    <div className="bold">{boldPlacehold}</div>
                    <div className="gray">{grayPlacehold}</div>
                </>
            );
        }
        return <div className="plain">{searchTerm}</div>;
    };

    return (
        <S.SearchBar>
            <S.Container ref={searchBarRef} isActive={showDropDown}>
                <S.TextContainer onClick={onClickSearchBar}>
                    <S.Icon>🔍</S.Icon>
                    {!showDropDown ? (
                        <S.TextWrapper>
                            <Placeholder />
                        </S.TextWrapper>
                    ) : (
                        <S.SearchInput
                            autoFocus
                            value={searchTerm}
                            onChange={onChangeInput}
                            onKeyDown={handleKeyDown}
                        />
                    )}
                </S.TextContainer>
                {showDropDown && (
                    <S.HistoryList>
                        {searchHistory.map((term, index) => (
                            <S.History
                                key={index}
                                onClick={() => onClickHistory(term)}
                                style={{
                                    backgroundColor:
                                        highlightedIndex === index
                                            ? "#f0f0f0"
                                            : "transparent", // 선택된 항목 하이라이트
                                }}
                            >
                                <S.HistoryText>{term}</S.HistoryText>
                                <S.DeleteButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeSearchTerm(
                                            userId,
                                            purpose,
                                            index,
                                        );
                                    }}
                                >
                                    삭제
                                </S.DeleteButton>
                            </S.History>
                        ))}
                    </S.HistoryList>
                )}
            </S.Container>
        </S.SearchBar>
    );
};

SearchBar.propTypes = {
    userId: PropTypes.string,
    purpose: PropTypes.string.isRequired,
    boldPlacehold: PropTypes.string,
    grayPlacehold: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    value: PropTypes.string,
};

export default SearchBar;
