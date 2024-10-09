import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Category from "../components/Category/Category";
import Pagination from "../components/Pagination/Pagination";
import SortSelector from "./../components/SortSelector/SortSelector";
import styled from "styled-components";
import { useRecipeStore } from "../store/recipeStore";
import RecipeCardList from "./../components/CardList/RecipeCardList";
import { fetchRecipes } from "../api/recipe";
import SearchBar from "./../components/SearchBar/SearchBar";

const PopularRecipe = styled.h2`
    font-family: "SUITEXTRABOLD";
    padding: 20px;
    margin-left: 50px;
    font-size: ${({ theme }) => theme.fontSize.h3};
`;

const Emoji = styled.span`
    font-family: "tosseface";
`;

const Recipe = () => {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState({ data: [], totalCount: 0 });
    const recipesPerPage = 20;

    const {
        selectedType,
        selectedSituation,
        selectedIngredients,
        selectedMethod,
        sortOrder,
        currentPage,
        setSelectedType,
        setSelectedSituation,
        setSelectedIngredients,
        setSelectedMethod,
        setSortOrder,
        setCurrentPage,
    } = useRecipeStore();

    const handleSearchSubmit = (term) => {
        navigate(`/search?keyword=${encodeURIComponent(term)}`);
    };

    useEffect(() => {
        const loadRecipes = async () => {
            const response = await fetchRecipes(currentPage, recipesPerPage);
            setRecipes({
                data: response.data,
                totalCount: response.totalCount,
            });
        };

        loadRecipes();
    }, [currentPage]);

    useEffect(() => {
        const params = new URLSearchParams();
        params.set("sort", sortOrder);
        params.set("page", currentPage);
        navigate(`?${params.toString()}`);
    }, [sortOrder, currentPage, navigate]);

    const filteredRecipes = recipes.data.filter((recipe) => {
        return (
            (!selectedType ||
                selectedType === "B_0001" ||
                recipe.type === selectedType) &&
            (!selectedSituation ||
                selectedSituation === "C_0001" ||
                recipe.situation === selectedSituation) &&
            (!selectedIngredients ||
                selectedIngredients === "D_0001" ||
                recipe.ingredients.includes(selectedIngredients)) &&
            (!selectedMethod ||
                selectedMethod === "E_0001" ||
                recipe.method === selectedMethod)
        );
    });

    const sortedRecipes = [...filteredRecipes].sort((a, b) => {
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

    const popularRecipes = [...recipes.data]
        .sort((a, b) => b.likeCount - a.likeCount)
        .slice(0, 4);

    // 전체 페이지 수 계산
    const pageCount = Math.ceil(recipes.totalCount / recipesPerPage);

    const handlePageChange = (selected) => {
        setCurrentPage(selected);
        window.scrollTo(0, 0); // 페이지 변경 시 상단으로 스크롤
    };

    return (
        <div>
            <SearchBar
                userId="yourUserId"
                purpose="recipeSearch"
                boldPlacehold="레시피 검색"
                grayPlacehold="키워드를 입력하세요"
                onSubmit={handleSearchSubmit}
            />
            <PopularRecipe>
                <Emoji>🔥</Emoji> 인기 레시피
            </PopularRecipe>
            <RecipeCardList recipes={popularRecipes} />
            <Category
                onTypeSelect={setSelectedType}
                onSituationSelect={setSelectedSituation}
                onIngredientsSelect={setSelectedIngredients}
                onMethodSelect={setSelectedMethod}
            />
            <SortSelector sortOrder={sortOrder} onSortChange={setSortOrder} />
            <RecipeCardList recipes={sortedRecipes} />
            <Pagination
                pageCount={pageCount}
                onPageChange={({ selected }) => handlePageChange(selected)}
                currentPage={currentPage}
            />
        </div>
    );
};

export default Recipe;
