import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "../components/Pagination/Pagination";
import SortSelector from "../components/SortSelector/SortSelector";
import styled from "styled-components";
import { useSearchResultStore } from "../store/recipeStore";
import RecipeCardList from "../components/CardList/RecipeCardList";
import { fetchRecipes, searchRecipes } from "../api/recipe";
import SearchBar from "../components/SearchBar/SearchBar";

const PopularRecipe = styled.h2`
    font-family: "SUITEXTRABOLD";
    padding: 20px;
    margin-left: 50px;
    font-size: ${({ theme }) => theme.fontSize.h3};
`;

const Emoji = styled.span`
    font-family: "tossface";
`;

const NoResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
`;

const NoResult = styled.h2`
    font-family: "SUITEXTRABOLD";
    padding: 20px;
    display: flex;
    align-items: center;
`;

const NoResultSearch = styled.p`
    font-family: "SUITEXTRABOLD";
    padding: 20px;
    cursor: pointer;
    color: blue;
`;

const SearchRecipe = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    const { sortOrder, currentPage, setSortOrder, setCurrentPage } =
        useSearchResultStore();

    const recipesPerPage = 20;
    const [recipes, setRecipes] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [totalCount, setTotalCount] = useState(0); // 총 레시피 수 상태 추가
    const keyword = query.get("keyword") || ""; // 검색 키워드 변수 추가

    useEffect(() => {
        const loadRecipes = async () => {
            let data;
            const page = parseInt(query.get("page")) || 0;

            if (keyword) {
                data = await searchRecipes(keyword);
            } else {
                data = await fetchRecipes(page, recipesPerPage);
            }

            if (data && Array.isArray(data.recipeList)) {
                setRecipes(data.recipeList);
                setTotalCount(data.count);
                setErrorMessage(null);
            } else {
                const message = data;
                setRecipes([]);
                setErrorMessage(message);
            }
        };

        loadRecipes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search, keyword]);

    // 인기 레시피 로직
    const popularRecipes = [...recipes]
        .sort((a, b) => b.likeCount - a.likeCount)
        .slice(0, 4);

    // 정렬 로직
    const sortedRecipes = [...recipes].sort((a, b) => {
        switch (sortOrder) {
            case "최신순":
                return new Date(b.modifiedDate) - new Date(a.modifiedDate);
            case "추천순":
                return b.likeCount - a.likeCount;
            case "댓글순":
                return b.viewCount - a.viewCount;
            default:
                return 0;
        }
    });

    const paginatedRecipes = sortedRecipes.slice(
        currentPage * recipesPerPage,
        (currentPage + 1) * recipesPerPage,
    );

    const handleNoResultClick = () => {
        if (errorMessage) {
            navigate(`/search?keyword=${encodeURIComponent(errorMessage)}`);
        }
    };

    return (
        <div>
            <SearchBar
                userId="yourUserId"
                purpose="recipeSearch"
                boldPlacehold="레시피 검색"
                grayPlacehold="키워드를 입력하세요"
                onSubmit={(term) => {
                    setCurrentPage(0); // 페이지를 0으로 설정
                    navigate(`/search?keyword=${term}&page=0`); // 페이지를 0으로 설정
                }}
            />

            {paginatedRecipes.length === 0 ? (
                <NoResultContainer>
                    <NoResult>
                        <Emoji>😥</Emoji>
                        검색 결과가 없습니다.
                    </NoResult>
                    <NoResult>
                        혹시 이걸 찾으시나요?
                        <NoResultSearch onClick={handleNoResultClick}>
                            {errorMessage && <div>{errorMessage}</div>}
                        </NoResultSearch>
                    </NoResult>
                </NoResultContainer>
            ) : (
                <div>
                    <PopularRecipe>
                        <Emoji>🔥</Emoji> {keyword} 인기 레시피
                    </PopularRecipe>
                    <RecipeCardList recipes={popularRecipes} />

                    <SortSelector
                        sortOrder={sortOrder}
                        onSortChange={(order) => {
                            setSortOrder(order);
                            setCurrentPage(0); // 페이지를 0으로 리셋
                        }}
                    />

                    <RecipeCardList recipes={paginatedRecipes} />

                    {Math.ceil(totalCount / recipesPerPage) > 1 && (
                        <Pagination
                            pageCount={Math.ceil(totalCount / recipesPerPage)}
                            onPageChange={({ selected }) => {
                                setCurrentPage(selected);
                                navigate(
                                    `/search?keyword=${keyword}&page=${selected}`,
                                );
                            }}
                            currentPage={currentPage}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchRecipe;
