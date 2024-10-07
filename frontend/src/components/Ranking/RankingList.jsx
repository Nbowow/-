/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import {
    Container,
    SearchInput,
    Table,
    Th,
    Td,
    UserImage,
} from "./RankingList.styled"; // 스타일드 컴포넌트 가져오기
import Pagination from "./../Pagination/Pagination";
import { fetchRanking } from "./../../api/ranking";

const columns = [
    {
        Header: "순위",
        accessor: "rank",
        Cell: ({ row }) => row.index + 1, // 순위를 1부터 시작하도록 설정
    },
    {
        Header: "캐릭터",
        accessor: "image",
        Cell: ({ row }) => (
            <div style={{ display: "flex", alignItems: "center" }}>
                <UserImage src={row.original.image} alt="User" />
                {row.original.nickname}
            </div>
        ),
    },
    {
        Header: "게시글수",
        accessor: "recipeCount", // API의 필드에 맞게 수정
        sortType: "basic",
    },
    {
        Header: "좋아요수",
        accessor: "likeCount", // API의 필드에 맞게 수정
        sortType: "basic",
    },
    {
        Header: "랭킹점수",
        accessor: "score",
        sortType: "basic",
    },
];

const UserTable = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [userData, setUserData] = useState([]); // 사용자 데이터를 저장할 상태
    const itemsPerPage = 5;

    useEffect(() => {
        const loadRankingData = async () => {
            try {
                const data = await fetchRanking(currentPage, itemsPerPage);
                setUserData(data); // API에서 받은 데이터를 상태에 저장
            } catch (error) {
                console.error("Failed to fetch ranking data:", error);
            }
        };

        loadRankingData();
    }, [currentPage]); // 페이지가 변경될 때마다 데이터 재호출

    const filteredData = useMemo(() => {
        return userData.filter((user) =>
            user.nickname.toLowerCase().includes(searchTerm.toLowerCase()),
        );
    }, [searchTerm, userData]);

    const sortedData = useMemo(() => {
        return [...filteredData].sort((a, b) => b.score - a.score);
    }, [filteredData]);

    const pageCount = Math.ceil(sortedData.length / itemsPerPage);

    const displayedData = useMemo(() => {
        return sortedData.slice(
            currentPage * itemsPerPage,
            (currentPage + 1) * itemsPerPage,
        );
    }, [sortedData, currentPage, itemsPerPage]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data: displayedData }, useSortBy);

    const handlePageChange = (selectedItem) => {
        setCurrentPage(selectedItem.selected);
    };

    useEffect(() => {
        setCurrentPage(0);
    }, [searchTerm]);

    return (
        <Container>
            <SearchInput
                type="text"
                placeholder="이름으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr
                            {...headerGroup.getHeaderGroupProps()}
                            key={headerGroup.id}
                        >
                            {headerGroup.headers.map((column) => (
                                <Th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps(),
                                    )}
                                    key={column.id}
                                >
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? " 🔽"
                                                : " 🔼"
                                            : ""}
                                    </span>
                                </Th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={row.id}>
                                {row.cells.map((cell) => (
                                    <Td
                                        {...cell.getCellProps()}
                                        key={cell.column.id}
                                    >
                                        {cell.render("Cell")}
                                    </Td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <Pagination
                pageCount={pageCount}
                onPageChange={handlePageChange}
                forcePage={currentPage}
            />
        </Container>
    );
};

export default UserTable;
