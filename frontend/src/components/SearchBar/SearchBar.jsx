import { useEffect, useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import useSearchHistoryStore from "../../store/searchHistoryStore";
import * as S from "./SearchBar.styled";

const SearchBar = ({
    userId,
    purpose,
    boldPlacehold,
    grayPlacehold,
    onSubmit,
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showDropDown, setShowDropDown] = useState(false);
    const { getSearchTerm, addSearchTerm, removeSearchTerm } =
        useSearchHistoryStore();

    const searchBarRef = useRef(null);
    const searchHistory = purpose ? getSearchTerm(userId, purpose) : [];

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClose);
        return () =>
            document.removeEventListener("mousedown", handleOutsideClose);
    }, []);

    const handleOutsideClose = (e) => {
        if (searchBarRef.current && !searchBarRef.current.contains(e.target))
            setShowDropDown(false);
    };

    const onClickSearchBar = () => {
        setShowDropDown(true);
    };

    const onChangeInput = (e) => {
        setSearchTerm(e.target.value);
        setShowDropDown(true);
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
    ); // addSearchTerm 추가

    const onClickHistory = (term) => {
        handleSearchSubmit(term);
    };

    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                handleSearchSubmit(searchTerm);
            }
        },
        [searchTerm, handleSearchSubmit],
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
};

export default SearchBar;
