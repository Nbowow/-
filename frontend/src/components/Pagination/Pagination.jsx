import PropTypes from "prop-types";
import { PaginationContainer, PageButton } from "./Pagitnation.styled"; // 스타일드 컴포넌트 임포트

const Pagination = ({ pageCount, onPageChange, currentPage }) => {
    const handlePageClick = (page) => {
        onPageChange({ selected: page });
    };

    const handleFirstPage = () => {
        onPageChange({ selected: 0 });
    };

    const handleLastPage = () => {
        onPageChange({ selected: pageCount - 1 });
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            onPageChange({ selected: currentPage - 1 });
        }
    };

    const handleNextPage = () => {
        if (currentPage < pageCount - 1) {
            onPageChange({ selected: currentPage + 1 });
        }
    };

    return (
        <PaginationContainer>
            <PageButton onClick={handleFirstPage} disabled={currentPage === 0}>
                &lt;&lt; {/* 첫 페이지 버튼 */}
            </PageButton>
            <PageButton onClick={handlePrevPage} disabled={currentPage === 0}>
                &lt; {/* 이전 페이지 버튼 */}
            </PageButton>
            {Array.from({ length: pageCount }, (_, index) => (
                <PageButton
                    key={index}
                    onClick={() => handlePageClick(index)}
                    disabled={currentPage === index} // 현재 페이지 버튼 비활성화
                    style={{
                        fontWeight: currentPage === index ? "bold" : "normal",
                    }} // 현재 페이지 강조
                >
                    {index + 1}
                </PageButton>
            ))}
            <PageButton
                onClick={handleNextPage}
                disabled={currentPage === pageCount - 1}
            >
                &gt; {/* 다음 페이지 버튼 */}
            </PageButton>
            <PageButton
                onClick={handleLastPage}
                disabled={currentPage === pageCount - 1}
            >
                &gt;&gt; {/* 마지막 페이지 버튼 */}
            </PageButton>
        </PaginationContainer>
    );
};

Pagination.propTypes = {
    pageCount: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
};

export default Pagination;
