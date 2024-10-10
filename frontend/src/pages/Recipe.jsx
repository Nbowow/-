import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Category from "../components/Category/Category";
import Pagination from "../components/Pagination/Pagination";
import RecipeCardList from "../components/CardList/RecipeCardList";
import RecipeCardSkeleton from "../components/SkeletonLoading/RecipeSkeleton";
import { fetchRecipes, filterRecipes } from "../api/recipe";
import SearchBar from "../components/SearchBar/SearchBar";
import * as S from "./Reicpe.styled";

const Recipe = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [recipes, setRecipes] = useState({ data: [], totalCount: 0 });
    const [loading, setLoading] = useState(true);
    const recipesPerPage = 20;

    const type = searchParams.get("B") || "";
    const situation = searchParams.get("C") || "";
    const ingredients = searchParams.get("D") || "";
    const method = searchParams.get("E") || "";
    const currentPage = parseInt(searchParams.get("page") || "0", 10);

    const handleSearchSubmit = (term) => {
        navigate(`/search?keyword=${encodeURIComponent(term)}`);
    };

    const updateFilters = (key, value) => {
        const newSearchParams = new URLSearchParams(searchParams);

        if (
            !value ||
            value === "B_0001" ||
            value === "C_0001" ||
            value === "D_0001" ||
            value === "E_0001"
        ) {
            newSearchParams.delete(key);
        } else {
            newSearchParams.set(key, value);
        }

        // 필터를 변경할 때 페이지를 초기화
        newSearchParams.set("page", "0");
        setSearchParams(newSearchParams);
    };

    const handlePageChange = (selected) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("page", selected.toString());
        setSearchParams(newSearchParams);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        const loadRecipes = async () => {
            setLoading(true);
            try {
                let response;
                const hasFilters = type || situation || ingredients || method;

                if (!hasFilters) {
                    response = await fetchRecipes(currentPage, recipesPerPage);
                } else {
                    // 페이지 번호와 페이지 사이즈를 전달
                    response = await filterRecipes(
                        type,
                        situation,
                        ingredients,
                        method,
                        currentPage,
                        recipesPerPage,
                    );
                }

                // totalCount를 API 응답에서 설정
                setRecipes({
                    data: response.data || [], // data가 없을 경우 빈 배열
                    totalCount: response.totalCount || 0, // totalCount를 API 응답에서 설정
                });
            } finally {
                setLoading(false);
            }
        };

        loadRecipes();
    }, [type, situation, ingredients, method, currentPage]);

    // 인기 레시피 계산
    const popularRecipes = [...recipes.data]
        .sort((a, b) => b.likeCount - a.likeCount)
        .slice(0, 4); // 상위 4개의 인기 레시피

    const pageCount = Math.ceil(recipes.totalCount / recipesPerPage);

    return (
        <S.Container>
            <SearchBar
                userId="yourUserId"
                purpose="recipeSearch"
                boldPlacehold="레시피 검색"
                grayPlacehold="키워드를 입력하세요"
                onSubmit={handleSearchSubmit}
            />

            {loading ? (
                <>
                    <S.PopularRecipe>
                        <S.Emoji>🔥</S.Emoji> 인기 레시피
                    </S.PopularRecipe>
                    <RecipeCardSkeleton />
                    <Category
                        onTypeSelect={(value) => updateFilters("B", value)}
                        onSituationSelect={(value) => updateFilters("C", value)}
                        onIngredientsSelect={(value) =>
                            updateFilters("D", value)
                        }
                        onMethodSelect={(value) => updateFilters("E", value)}
                        selectedType={type}
                        selectedSituation={situation}
                        selectedIngredients={ingredients}
                        selectedMethod={method}
                    />
                    <RecipeCardSkeleton />
                </>
            ) : recipes.data.length === 0 ? ( // 레시피가 없을 경우
                <div>
                    <Category
                        onTypeSelect={(value) => updateFilters("B", value)}
                        onSituationSelect={(value) => updateFilters("C", value)}
                        onIngredientsSelect={(value) =>
                            updateFilters("D", value)
                        }
                        onMethodSelect={(value) => updateFilters("E", value)}
                        selectedType={type}
                        selectedSituation={situation}
                        selectedIngredients={ingredients}
                        selectedMethod={method}
                    />
                    <S.NoResultContainer>
                        <S.NoResult>
                            <S.Emoji>😥</S.Emoji>
                            필터 된 레시피가 없습니다.
                        </S.NoResult>
                    </S.NoResultContainer>
                </div>
            ) : (
                <>
                    <S.PopularRecipe>
                        <S.Emoji>🔥</S.Emoji> 인기 레시피
                    </S.PopularRecipe>
                    <RecipeCardList
                        recipes={popularRecipes}
                        showProfile={true}
                    />
                    <Category
                        onTypeSelect={(value) => updateFilters("B", value)}
                        onSituationSelect={(value) => updateFilters("C", value)}
                        onIngredientsSelect={(value) =>
                            updateFilters("D", value)
                        }
                        onMethodSelect={(value) => updateFilters("E", value)}
                        selectedType={type}
                        selectedSituation={situation}
                        selectedIngredients={ingredients}
                        selectedMethod={method}
                    />
                    <RecipeCardList recipes={recipes.data} showProfile={true} />
                    {pageCount > 1 && (
                        <Pagination
                            pageCount={pageCount}
                            onPageChange={({ selected }) =>
                                handlePageChange(selected)
                            }
                            currentPage={currentPage}
                        />
                    )}
                </>
            )}
        </S.Container>
    );
};

export default Recipe;
