import * as S from "./SearchHistory.styled";
import PropTypes from "prop-types";

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
