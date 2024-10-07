import { useNavigate } from "react-router-dom";
import useSearchHistoryStore from "../../store/searchHistoryStore";
import * as S from "./SearchBar.styled";
import PropTypes from "prop-types";
import { useState, useEffect, useRef, useCallback } from "react";

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
    const navigate = useNavigate(); 

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
        setShowDropDown(true); // 입력 시 드롭다운 열기
    };

    const onClickHistory = (term) => {
        setSearchTerm(term);
        setShowDropDown(false);
        // 클릭 시 바로 검색
        navigate(`/search?keyword=${term}`); // 검색어를 쿼리 파라미터로 포함하여 이동
    };

    const handleSubmit = useCallback(
        (e) => {
            if (e.key === "Enter" && searchTerm.trim()) {
                if (userId) addSearchTerm(userId, purpose, searchTerm);
                setShowDropDown(false);
                navigate(`/search?keyword=${searchTerm.trim()}`); // 검색어를 쿼리 파라미터로 포함하여 이동
            }
        },
        [addSearchTerm, navigate, userId, purpose, searchTerm],
    );

    const Placeholder = () => {
        if (!searchTerm || searchTerm === "")
            return (
                <>
                    <div className="bold">{boldPlacehold}</div>
                    <div className="gray">{grayPlacehold}</div>
                </>
            );

        return <div className="plain">{searchTerm}</div>;
    };

    return (
        <S.SearchBar>
            <S.Container ref={searchBarRef} isActive={showDropDown}>
                <S.TextContainer onClick={onClickSearchBar}>
                    <S.Icon>🔍</S.Icon>
                    {/* input form 렌더링 */}
                    {!showDropDown ? (
                        <S.TextWrapper>
                            <Placeholder />
                        </S.TextWrapper>
                    ) : (
                        <S.SearchInput
                            autoFocus
                            value={searchTerm}
                            onChange={onChangeInput}
                            onKeyDown={handleSubmit}
                        />
                    )}
                </S.TextContainer>
                {/* 검색 기록 렌더링 */}
                {showDropDown && (
                    <S.HistoryList>
                        {searchHistory.map((term, index) => (
                            <S.History
                                key={index}
                                onClick={() => onClickHistory(term)}
                            >
                                <S.HistoryText>{term}</S.HistoryText>
                                <S.DeleteButton
                                    onClick={() =>
                                        removeSearchTerm(userId, purpose, index)
                                    }
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
    onSubmit: PropTypes.func,
};

export default SearchBar;
