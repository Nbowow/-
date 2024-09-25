import * as S from "./SearchBar.styled";
import { useState } from "react";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    // 임시 검색 기록 데이터
    const searchHistory = [
        "React styled-components",
        "Google search bar clone",
        "JavaScript debounce",
        "React Zustand",
        "React hooks",
    ];

    // 입력 값이 바뀔 때마다 실행되는 함수
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value) {
            setShowDropdown(true);
        } else {
            setShowDropdown(false);
        }
    };

    // 드롭다운 아이템 클릭 시 검색어 설정
    const handleDropdownClick = (item) => {
        setSearchTerm(item);
        setShowDropdown(false);
    };

    return (
        <S.Container>
            <S.SearchInput
                type="text"
                value={searchTerm}
                placeholder="오늘은 무슨 요리를 할까요?"
                onChange={handleChange}
                onFocus={() => setShowDropdown(true)}
            />

            {showDropdown && (
                <S.Dropdown>
                    {searchHistory
                        .filter((item) =>
                            item
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase()),
                        ) // 검색어 필터링
                        .map((item, index) => (
                            <S.DropdownItem
                                key={index}
                                onClick={() => handleDropdownClick(item)}
                            >
                                {item}
                            </S.DropdownItem>
                        ))}
                </S.Dropdown>
            )}
        </S.Container>
    );
};

export default SearchBar;
