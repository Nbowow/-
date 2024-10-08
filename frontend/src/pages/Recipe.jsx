import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Category from "../components/Category/Category";
import Pagination from "../components/Pagination/Pagination";
import SortSelector from "./../components/SortSelector/SortSelector";
import styled from "styled-components";
import { useRecipeStore } from "../store/recipeStore"; // zustand 스토어 가져오기
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

    const handleSearchSubmit = (term) => {
        navigate(`/search?keyword=${encodeURIComponent(term)}`);
    };
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
    } = useRecipeStore(); // zustand 스토어 사용

    const recipesPerPage = 20;
    const [recipes, setRecipes] = useState([]); // API 응답을 저장할 상태

    useEffect(() => {
        const loadRecipes = async () => {
            const data = await fetchRecipes(currentPage, recipesPerPage);
            setRecipes(data);
        };

        loadRecipes();
    }, [currentPage]); // currentPage가 변경될 때마다 호출

    useEffect(() => {
        const params = new URLSearchParams();
        params.set("sort", sortOrder);
        params.set("page", currentPage);
        navigate(`?${params.toString()}`);
    }, [sortOrder, currentPage, navigate]);

    const filteredRecipes = recipes.filter((recipe) => {
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

    const popularRecipes = [...recipes]
        .sort((a, b) => b.likeCount - a.likeCount)
        .slice(0, 4);

    // 페이지네이션을 위한 현재 페이지에 맞는 레시피 선택
    const startIndex = currentPage * recipesPerPage;
    const endIndex = startIndex + recipesPerPage;
    const currentRecipes = sortedRecipes.slice(startIndex, endIndex);
    const pageCount = Math.ceil(sortedRecipes.length / recipesPerPage);

    return (
        <div>
            <SearchBar
                userId="yourUserId" // 적절한 userId를 전달
                purpose="recipeSearch" // purpose prop을 전달
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
            <RecipeCardList recipes={currentRecipes} />
            <Pagination
                pageCount={pageCount}
                onPageChange={({ selected }) => setCurrentPage(selected)} // 페이지 변경 시 호출
                currentPage={currentPage} // 현재 페이지 전달
            />
        </div>
    );
};

export default Recipe;
