import { useEffect } from "react";
import PropTypes from "prop-types";
import {
    PaginationContainer,
    PageButton,
    PageButton2,
} from "./Pagination.styled";
import {
    FaAngleRight,
    FaAngleLeft,
    FaAnglesLeft,
    FaAnglesRight,
} from "react-icons/fa6";

const Pagination = ({ pageCount, onPageChange, currentPage }) => {
    useEffect(() => {}, [currentPage, pageCount]);

    const handlePageClick = (page) => {
        if (page !== currentPage) {
            onPageChange({ selected: page });
        }
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

    const renderPageButtons = () => {
        const buttons = [];

        // 항상 처음 5개 페이지 표시
        for (let i = 0; i < Math.min(5, pageCount); i++) {
            buttons.push(
                <PageButton
                    key={i}
                    onClick={() => handlePageClick(i)}
                    disabled={currentPage === i}
                    $active={currentPage === i}
                >
                    {i + 1}
                </PageButton>,
            );
        }

        // 현재 페이지가 처음 5개와 마지막 5개 사이에 있는 경우
        if (currentPage >= 5 && currentPage < pageCount - 5) {
            buttons.push(<span key="ellipsis1">...</span>);
            // 현재 페이지 주변 표시
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                buttons.push(
                    <PageButton
                        key={i}
                        onClick={() => handlePageClick(i)}
                        disabled={currentPage === i}
                        $active={currentPage === i}
                    >
                        {i + 1}
                    </PageButton>,
                );
            }
        }

        // 마지막 5개 페이지 전에 ... 표시
        if (pageCount > 10) {
            buttons.push(<span key="ellipsis2">...</span>);
        }

        // 마지막 5개 페이지 표시
        for (let i = Math.max(pageCount - 5, 5); i < pageCount; i++) {
            buttons.push(
                <PageButton
                    key={i}
                    onClick={() => handlePageClick(i)}
                    disabled={currentPage === i}
                    $active={currentPage === i}
                >
                    {i + 1}
                </PageButton>,
            );
        }

        return buttons;
    };

    return (
        <PaginationContainer>
            <PageButton2 onClick={handleFirstPage} disabled={currentPage === 0}>
                <FaAnglesLeft />
            </PageButton2>
            <PageButton2 onClick={handlePrevPage} disabled={currentPage === 0}>
                <FaAngleLeft />
            </PageButton2>
            {renderPageButtons()}
            <PageButton2
                onClick={handleNextPage}
                disabled={currentPage === pageCount - 1}
            >
                <FaAngleRight />
            </PageButton2>
            <PageButton2
                onClick={handleLastPage}
                disabled={currentPage === pageCount - 1}
            >
                <FaAnglesRight />
            </PageButton2>
        </PaginationContainer>
    );
};

Pagination.propTypes = {
    pageCount: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
};

export default Pagination;
