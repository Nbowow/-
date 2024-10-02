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
} from "./UserTable.styled"; // 스타일드 컴포넌트 가져오기
import Pagination from "./../Pagination/Pagination";

const userData = [
    {
        id: 1,
        nickname: "User 1",
        posts: 10,
        likes: 20,
        score: 4.5,
        image: "https://via.placeholder.com/150",
    },
    {
        id: 2,
        nickname: "User 2",
        posts: 5,
        likes: 15,
        score: 4.0,
        image: "https://via.placeholder.com/150",
    },
    {
        id: 3,
        nickname: "User 3",
        posts: 8,
        likes: 25,
        score: 4.8,
        image: "https://via.placeholder.com/150",
    },
    {
        id: 4,
        nickname: "User 4",
        posts: 12,
        likes: 30,
        score: 4.2,
        image: "https://via.placeholder.com/150",
    },
    {
        id: 5,
        nickname: "User 5",
        posts: 6,
        likes: 18,
        score: 4.1,
        image: "https://via.placeholder.com/150",
    },
    {
        id: 6,
        nickname: "User 6",
        posts: 7,
        likes: 22,
        score: 4.4,
        image: "https://via.placeholder.com/150",
    },
];

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
        accessor: "posts",
        sortType: "basic",
    },
    {
        Header: "좋아요수",
        accessor: "likes",
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
    const itemsPerPage = 5;

    const filteredData = useMemo(() => {
        return userData.filter((user) =>
            user.nickname.toLowerCase().includes(searchTerm.toLowerCase()),
        );
    }, [searchTerm]);

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
