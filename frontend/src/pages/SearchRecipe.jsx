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
    const [errorMessage, setErrorMessage] = useState(null);
    const [totalCount, setTotalCount] = useState(0); // 총 레시피 수 상태 추가
    const keyword = query.get("keyword") || ""; // 검색 키워드 변수 추가

    useEffect(() => {
        const type = query.get("type") || "B_0001";
        const situation = query.get("situation") || "C_0001";
        const ingredients = query.get("ingredients") || "D_0001";
        const method = query.get("method") || "E_0001";
        const sort = query.get("sort") || "최신순";
        const page = parseInt(query.get("page")) || 0;

        setSelectedType(type);
        setSelectedSituation(situation);
        setSelectedIngredients(ingredients);
        setSelectedMethod(method);
        setSortOrder(sort);
        setCurrentPage(page);

        const loadRecipes = async () => {
            let data;
            if (keyword) {
                data = await searchRecipes(keyword);
            } else {
                data = await fetchRecipes(page, recipesPerPage);
            }

            if (data && Array.isArray(data.recipeList)) {
                setRecipes(data.recipeList);
                setTotalCount(data.count); // 총 레시피 수 설정
                setErrorMessage(null);
            } else {
                const message = data;
                setRecipes([]);
                setErrorMessage(message);
            }
        };

        loadRecipes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search]);

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
                    <Category
                        onTypeSelect={(type) => {
                            setSelectedType(type);
                            setCurrentPage(0);
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

                    {Math.ceil(totalCount / recipesPerPage) > 1 && (
                        <Pagination
                            pageCount={Math.ceil(totalCount / recipesPerPage)} // 총 페이지 수
                            onPageChange={({ selected }) =>
                                setCurrentPage(selected)
                            }
                            currentPage={currentPage}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchRecipe;
