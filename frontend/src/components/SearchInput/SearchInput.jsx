import * as S from "./SearchInput.styled";
import { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import SearchHistory from "./SearchHistory";
import useSearchHistoryStore from "../../store/searchHistoryStore";

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
