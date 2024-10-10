import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "../components/Pagination/Pagination";
import SortSelector from "../components/SortSelector/SortSelector";
import { useSearchResultStore } from "../store/recipeStore";
import RecipeCardList from "../components/CardList/RecipeCardList";
import { fetchRecipes, searchRecipes } from "../api/recipe";
import SearchBar from "../components/SearchBar/SearchBar";
import * as S from "./SearchRecipe.styled";
import RecipeCardSkeleton from "../components/SkeletonLoading/RecipeSkeleton";

const SearchRecipe = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    const { sortOrder, currentPage, setSortOrder, setCurrentPage } =
        useSearchResultStore();

    const recipesPerPage = 20;
    const [recipes, setRecipes] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const keyword = query.get("keyword") || "";

    useEffect(() => {
        const loadRecipes = async () => {
            setLoading(true);
            let data;
            const page = parseInt(query.get("page")) || 0;

            try {
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
                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setErrorMessage("레시피를 불러오는데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        loadRecipes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search, keyword, recipesPerPage]);

    const popularRecipes = [...recipes]
        .sort((a, b) => b.likeCount - a.likeCount)
        .slice(0, 4);

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

    const handleSearch = (term) => {
        setCurrentPage(0);
        navigate(`/search?keyword=${encodeURIComponent(term)}&page=0`);
    };

    return (
        <S.Container>
            <SearchBar
                userId="yourUserId"
                purpose="recipeSearch"
                boldPlacehold="레시피 검색"
                grayPlacehold="키워드를 입력하세요"
                onSubmit={handleSearch}
            />

            {loading ? (
                <RecipeCardSkeleton />
            ) : paginatedRecipes.length === 0 ? (
                <S.NoResultContainer>
                    <S.NoResult>
                        <S.Emoji>😥</S.Emoji>
                        검색 결과가 없습니다
                    </S.NoResult>
                    {errorMessage && (
                        <S.NoResult>
                            혹시 이걸 찾으시나요?
                            <S.NoResultSearch onClick={handleNoResultClick}>
                                {errorMessage}
                            </S.NoResultSearch>
                        </S.NoResult>
                    )}
                </S.NoResultContainer>
            ) : (
                <>
                    {keyword && (
                        <>
                            <S.PopularRecipe>
                                <S.Emoji>🔥</S.Emoji> {keyword} 인기 레시피
                            </S.PopularRecipe>
                            <RecipeCardList
                                recipes={popularRecipes}
                                showProfile={true}
                            />
                        </>
                    )}

                    <SortSelector
                        sortOrder={sortOrder}
                        onSortChange={(order) => {
                            setSortOrder(order);
                            setCurrentPage(0);
                        }}
                    />

                    <RecipeCardList
                        recipes={paginatedRecipes}
                        showProfile={true}
                    />

                    {Math.ceil(totalCount / recipesPerPage) > 1 && (
                        <Pagination
                            pageCount={Math.ceil(totalCount / recipesPerPage)}
                            onPageChange={({ selected }) => {
                                setCurrentPage(selected);
                                navigate(
                                    `/search?keyword=${encodeURIComponent(keyword)}&page=${selected}`,
                                );
                            }}
                            currentPage={currentPage}
                        />
                    )}
                </>
            )}
        </S.Container>
    );
};

export default SearchRecipe;
