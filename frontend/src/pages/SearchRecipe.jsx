import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Category from "../components/Category/Category";
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
    const [recipes, setRecipes] = useState([]); // 초기값은 배열로 설정
    const [errorMessage, setErrorMessage] = useState(null); // 에러 메시지 상태 추가

    // URL 파라미터로부터 상태 초기화 및 레시피 로드
    useEffect(() => {
        const type = query.get("type") || "B_0001";
        const situation = query.get("situation") || "C_0001";
        const ingredients = query.get("ingredients") || "D_0001";
        const method = query.get("method") || "E_0001";
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
            try {
                let data;
                if (keyword) {
                    data = await searchRecipes(keyword);
                } else {
                    data = await fetchRecipes(page, recipesPerPage);
                }

                // 응답이 배열인지 확인
                if (Array.isArray(data)) {
                    setRecipes(data);
                    setErrorMessage(null); // 에러 메시지 초기화
                } else {
                    const message = data;
                    setRecipes([]); // 배열이 아닐 경우 빈 배열로 설정
                    setErrorMessage(message); // 에러 메시지 설정
                }
                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setRecipes([]); // 오류 발생 시 빈 배열로 설정
                setErrorMessage("레시피 로드 중 오류 발생"); // 에러 메시지 설정
            }
        };

        loadRecipes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search]); // URL이 변경될 때마다 실행

    // 레시피 필터링 로직
    const filteredRecipes = Array.isArray(recipes)
        ? recipes.filter((recipe) => {
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
          })
        : []; // recipes가 배열이 아닐 경우 빈 배열로 설정

    const popularRecipes = [...recipes]
        .sort((a, b) => b.likeCount - a.likeCount)
        .slice(0, 4);

    return (
        <div>
            <SearchBar
                userId="yourUserId"
                purpose="recipeSearch"
                boldPlacehold="레시피 검색"
                grayPlacehold="키워드를 입력하세요"
                onSubmit={(term) => {
                    setSelectedType("B_0001");
                    setSelectedSituation("C_0001");
                    setSelectedIngredients("D_0001");
                    setSelectedMethod("E_0001");
                    setSortOrder("최신순");
                    setCurrentPage(0);
                    navigate(`/search?keyword=${term}`);
                }}
            />

            {filteredRecipes.length === 0 ? (
                <NoResultContainer>
                    <NoResult>
                        <Emoji>😥</Emoji>
                        검색 결과가 없습니다.
                        {errorMessage && <div>{errorMessage}</div>}{" "}
                        {/* 에러 메시지 출력 */}
                    </NoResult>
                </NoResultContainer>
            ) : (
                <div>
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

                    <RecipeCardList recipes={filteredRecipes} />

                    {Math.ceil(filteredRecipes.length / recipesPerPage) > 1 && (
                        <Pagination
                            pageCount={Math.ceil(
                                filteredRecipes.length / recipesPerPage,
                            )}
                            onPageChange={({ selected }) =>
                                setCurrentPage(selected)
                            } // 페이지 변경 시 호출
                            currentPage={currentPage}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchRecipe;
