import * as S from "./SearchHistory.styled";
import PropTypes from "prop-types";

/**
 * SearchHistory 컴포넌트
 *
 * @component
 * @param {Object} props - 컴포넌트에 전달되는 props
 * @param {string} props.term - 검색 기록 항목 텍스트
 * @param {function} [props.onClick] - 검색 기록 항목을 클릭할 때 호출되는 함수
 * @param {function} [props.onButtonClick] - 삭제 버튼을 클릭할 때 호출되는 함수
 *
 * @returns {JSX.Element} 검색 기록 항목 UI를 반환
 *
 * @example
 * const handleClick = () => console.log("clicked");
 * const handleDelete = () => console.log("deleted");
 * return (
 *   <SearchHistory term="Search Term" onClick={handleClick} onButtonClick={handleDelete} />
 * );
 */
const SearchHistory = ({ term, onClick, onButtonClick }) => {
    return (
        <S.HistoryContainer>
            <S.History onClick={onClick}>{term}</S.History>
            <S.DeleteButton onClick={onButtonClick}>삭제</S.DeleteButton>
        </S.HistoryContainer>
    );
};

SearchHistory.propTypes = {
    term: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onButtonClick: PropTypes.func,
};

export default SearchHistory;
