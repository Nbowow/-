import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { useTable, useSortBy } from "react-table";
import { useNavigate } from "react-router-dom";
import {
    Container,
    SearchInput,
    Table,
    Th,
    Td,
    UserImage,
    UserCell,
    RankText,
    SearchContainer,
    UserNavi,
} from "./RankingList.styled";
import Pagination from "../Pagination/Pagination";
import { fetchRanking } from "../../api/ranking";
/* eslint-disable react/prop-types */

const UserTable = () => {
    const navigate = useNavigate(); // useNavigate 훅을 컴포넌트 내에서 호출
    const [searchTerm, setSearchTerm] = useState("");
    const [userData, setUserData] = useState([]);
    const [itemsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(0);

    const loadRankingData = async () => {
        const rankList = await fetchRanking();
        const rankedList = rankList.map((user, index) => ({
            ...user,
            rank: index,
        }));
        setUserData(rankedList);
    };

    useEffect(() => {
        loadRankingData();
    }, []); // 빈 배열로 설정하여 컴포넌트 마운트 시 한 번만 호출

    const filteredData = useMemo(() => {
        return userData.filter((user) =>
            user.nickname.toLowerCase().includes(searchTerm.toLowerCase()),
        );
    }, [searchTerm, userData]);

    const pageCount = Math.ceil(filteredData.length / itemsPerPage);
    const displayedData = useMemo(() => {
        const start = currentPage * itemsPerPage;
        return filteredData.slice(start, start + itemsPerPage);
    }, [filteredData, currentPage, itemsPerPage]);

    const columns = useMemo(
        () => [
            {
                Header: "순위",
                accessor: "rank",
                width: "10%",
                Cell: ({ row }) => <RankText>{row.original.rank + 1}</RankText>,
                sortDescFirst: false,
            },
            {
                Header: "닉네임",
                accessor: "nickname",
                width: "40%",
                Cell: ({ row }) => (
                    <UserCell>
                        <UserImage src={row.original.image} alt="User" />
                        <UserNavi
                            onClick={() => navigate(`/user/${row.original.id}`)} // 유저 프로필로 이동
                        >
                            {row.original.nickname}
                        </UserNavi>
                    </UserCell>
                ),
                sortDescFirst: true,
            },
            {
                Header: "게시글수",
                accessor: "recipeCount",
                width: "15%",
                sortType: "basic",
                sortDescFirst: true,
            },
            {
                Header: "좋아요수",
                accessor: "likeCount",
                width: "15%",
                sortType: "basic",
                sortDescFirst: true,
            },
            {
                Header: "랭킹점수",
                accessor: "score",
                width: "20%",
                sortType: "basic",
                sortDescFirst: true,
            },
        ],
        [navigate],
    ); // navigate를 의존성으로 추가

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable(
            {
                columns,
                data: displayedData,
            },
            useSortBy,
        );

    const handlePageChange = (selectedItem) => {
        setCurrentPage(selectedItem.selected);
    };

    return (
        <Container>
            <SearchContainer>
                <SearchInput
                    type="text"
                    placeholder="닉네임을 검색하세요"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </SearchContainer>
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
                                    width={column.width}
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
                                        width={cell.column.width}
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
                currentPage={currentPage}
            />
        </Container>
    );
};

UserTable.propTypes = {
    userData: PropTypes.arrayOf(
        PropTypes.shape({
            rank: PropTypes.number,
            nickname: PropTypes.string,
            image: PropTypes.string,
            recipeCount: PropTypes.number,
            likeCount: PropTypes.number,
            score: PropTypes.number,
            id: PropTypes.string.isRequired, // ID 추가
        }),
    ).isRequired,
};

export default UserTable;
