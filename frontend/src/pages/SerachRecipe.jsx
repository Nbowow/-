/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Category from "../components/Category/Category";
import Pagination from "../components/Pagination/Pagination";
import SortSelector from "./../components/SortSelector/SortSelector";
import styled from "styled-components";
import { useSearchResultStore } from "../store/recipeStore";
import RecipeCardList from "./../components/CardList/RecipeCardList";
import { fetchRecipes, searchRecipes } from "../Api/recipe";
import SearchBar from "./../components/SearchBar/SearchBar";

const PopularRecipe = styled.h2`
    font-family: "SUITEXTRABOLD";
    padding: 20px;
`;

const Emoji = styled.span`
    font-family: "tossface";
`;

const SearchRecipe = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);

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
    } = useSearchResultStore();

    const recipesPerPage = 20;
    const [recipes, setRecipes] = useState([]);

    // URL 파라미터로부터 상태 초기화
    useEffect(() => {
        const type = query.get("type") || "전체";
        const situation = query.get("situation") || "전체";
        const ingredients = query.get("ingredients") || "전체";
        const method = query.get("method") || "전체";
        const sort = query.get("sort") || "최신순";
        const page = parseInt(query.get("page")) || 0;
        const keyword = query.get("keyword") || "";

        setSelectedType(type);
        setSelectedSituation(situation);
        setSelectedIngredients(ingredients);
        setSelectedMethod(method);
        setSortOrder(sort);
        setCurrentPage(page);

        // 레시피 데이터 로드
        const loadRecipes = async () => {
            if (keyword) {
                const data = await searchRecipes(keyword);
                setRecipes(data);
            } else {
                const data = await fetchRecipes(page, recipesPerPage);
                setRecipes(data);
            }
        };

        loadRecipes();
    }, [location.search]); // URL이 변경될 때마다 실행

    // 상태가 변경될 때마다 URL 업데이트
    useEffect(() => {
        const params = new URLSearchParams(location.search);

        // 현재 상태가 기본값이 아닐 때만 URL에 포함
        if (selectedType !== "전체") params.set("type", selectedType);
        if (selectedSituation !== "전체")
            params.set("situation", selectedSituation);
        if (selectedIngredients !== "전체")
            params.set("ingredients", selectedIngredients);
        if (selectedMethod !== "전체") params.set("method", selectedMethod);
        if (sortOrder !== "최신순") params.set("sort", sortOrder);
        if (currentPage !== 0) params.set("page", currentPage);

        // 키워드가 있다면 유지
        const keyword = query.get("keyword");
        if (keyword) {
            params.set("keyword", keyword);
        }

        navigate(`?${params.toString()}`, { replace: true });
    }, [
        selectedType,
        selectedSituation,
        selectedIngredients,
        selectedMethod,
        sortOrder,
        currentPage,
    ]);

    // 레시피 필터링 로직
    const filteredRecipes = recipes.filter((recipe) => {
        const typeMatch =
            !selectedType ||
            selectedType === "전체" ||
            recipe.type === selectedType;
        const situationMatch =
            !selectedSituation ||
            selectedSituation === "전체" ||
            recipe.situation === selectedSituation;
        const ingredientsMatch =
            !selectedIngredients ||
            selectedIngredients === "전체" ||
            recipe.ingredients.includes(selectedIngredients);
        const methodMatch =
            !selectedMethod ||
            selectedMethod === "전체" ||
            recipe.method === selectedMethod;

        return typeMatch && situationMatch && ingredientsMatch && methodMatch;
    });

    // 레시피 정렬 로직
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

    // 인기 레시피 선택 (상위 4개)
    const popularRecipes = [...recipes]
        .sort((a, b) => b.likeCount - a.likeCount)
        .slice(0, 4);

    // 페이지네이션 로직
    const startIndex = currentPage * recipesPerPage;
    const endIndex = startIndex + recipesPerPage;
    const currentRecipes = sortedRecipes.slice(startIndex, endIndex);
    const pageCount = Math.ceil(sortedRecipes.length / recipesPerPage);

    // 페이지 변경 핸들러
    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
        window.scrollTo(0, 0); // 페이지 변경 시 맨 위로 스크롤
    };

    return (
        <div>
            <SearchBar
                userId="yourUserId"
                purpose="recipeSearch"
                boldPlacehold="레시피 검색"
                grayPlacehold="키워드를 입력하세요"
                onSubmit={(term) => {
                    // 검색 시 다른 필터 초기화
                    setSelectedType("전체");
                    setSelectedSituation("전체");
                    setSelectedIngredients("전체");
                    setSelectedMethod("전체");
                    setSortOrder("최신순");
                    setCurrentPage(0);
                    navigate(`/search?keyword=${term}`);
                }}
            />

            <PopularRecipe>
                <Emoji>🔥</Emoji> 인기 레시피
            </PopularRecipe>
            <RecipeCardList recipes={popularRecipes} />

            <Category
                onTypeSelect={(type) => {
                    setSelectedType(type);
                    setCurrentPage(0); // 필터 변경 시 첫 페이지로
                }}
                onSituationSelect={(situation) => {
                    setSelectedSituation(situation);
                    setCurrentPage(0);
                }}
                onIngredientsSelect={(ingredients) => {
                    setSelectedIngredients(ingredients);
                    setCurrentPage(0);
                }}
                onMethodSelect={(method) => {
                    setSelectedMethod(method);
                    setCurrentPage(0);
                }}
            />

            <SortSelector
                sortOrder={sortOrder}
                onSortChange={(order) => {
                    setSortOrder(order);
                    setCurrentPage(0);
                }}
            />

            <RecipeCardList recipes={currentRecipes} />

            {pageCount > 1 && (
                <Pagination
                    pageCount={pageCount}
                    onPageChange={handlePageChange}
                    currentPage={currentPage}
                />
            )}
        </div>
    );
};

export default SearchRecipe;
