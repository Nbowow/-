import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Category from "../components/Category/Category";
// import CategoryIcon from "../components/Category/CategoryIcon";
import Pagination from "../components/Pagination/Pagination";
import SortSelector from "./../components/SortSelector/SortSelector";
import RecipeList from "./../components/ReicipeList/RecipeList";
import SearchBar from "./../components/SearchBar/SearchBar";

const SearchRecipe = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // 쿼리 파라미터에서 상태를 가져오는 함수
    const getQueryParams = () => {
        const params = new URLSearchParams(location.search);
        return {
            sortOrder: params.get("sort") || "최신순",
            page: Number(params.get("page")) || 0,
        };
    };

    const { sortOrder, page } = getQueryParams();

    const [selectedType, setSelectedType] = useState("전체");
    const [selectedSituation, setSelectedSituation] = useState("전체");
    const [selectedIngredients, setSelectedIngredients] = useState("전체");
    const [selectedMethod, setSelectedMethod] = useState("전체");
    const [currentPage, setCurrentPage] = useState(page);
    const [sortOrderState, setSortOrder] = useState(sortOrder);

    const recipesPerPage = 5;

    const Recipes = [
        {
            id: 1,
            title: "김치찌개",
            name: "전통 김치찌개",
            intro: "매콤하고 깊은 맛의 김치찌개",
            image: "https://example.com/images/korean_stew.jpg",
            likeCount: 10,
            viewCount: 100,
            servings: 4,
            time: 30,
            level: "중급",
            cookingTools: "냄비, 국자",
            type: "찌개",
            situation: "가정식",
            ingredients: "김치, 돼지고기, 두부, 대파",
            method: "찜",
            modifiedDate: new Date().toISOString(),
            createdDate: new Date().toISOString(),
            userId: 1,
        },
        {
            id: 2,
            title: "비빔밥",
            name: "비빔밥 레시피",
            intro: "신선한 야채와 고추장이 어우러진 비빔밥",
            image: "https://example.com/images/bibimbap.jpg",
            likeCount: 20,
            viewCount: 150,
            servings: 2,
            time: 20,
            level: "초급",
            cookingTools: "밥솥, 그릇",
            type: "비빔",
            situation: "한끼 식사",
            ingredients: "밥, 야채, 고추장, 계란",
            method: "모든 재료를 섞어 비빈다.",
            modifiedDate: new Date().toISOString(),
            createdDate: new Date().toISOString(),
            userId: 2,
        },
        {
            id: 3,
            title: "불고기",
            name: "달콤한 불고기",
            intro: "달콤하고 짭짤한 소고기 요리",
            image: "https://example.com/images/bulgogi.jpg",
            likeCount: 15,
            viewCount: 200,
            servings: 3,
            time: 40,
            level: "중급",
            cookingTools: "팬, 그릇",
            type: "구이",
            situation: "특별한 날",
            ingredients: "소고기, 간장, 설탕, 마늘",
            method: "재료를 재워서 팬에 구운다.",
            modifiedDate: new Date().toISOString(),
            createdDate: new Date().toISOString(),
            userId: 3,
        },
        {
            id: 4,
            title: "떡볶이",
            name: "매콤한 떡볶이",
            intro: "매운 소스에 버무린 떡볶이",
            image: "https://example.com/images/tteokbokki.jpg",
            likeCount: 25,
            viewCount: 250,
            servings: 4,
            time: 25,
            level: "초급",
            cookingTools: "냄비, 숟가락",
            type: "간식",
            situation: "간식으로",
            ingredients: "떡, 어묵, 고추장, 설탕",
            method: "모든 재료를 넣고 끓인다.",
            modifiedDate: new Date().toISOString(),
            createdDate: new Date().toISOString(),
            userId: 4,
        },
        {
            id: 5,
            title: "잡채",
            name: "부드러운 잡채",
            intro: "다양한 재료와 함께 볶은 잡채",
            image: "https://example.com/images/japchae.jpg",
            likeCount: 18,
            viewCount: 180,
            servings: 5,
            time: 35,
            level: "중급",
            cookingTools: "팬, 그릇",
            type: "볶음",
            situation: "연회용",
            ingredients: "당면, 야채, 소고기, 간장",
            method: "모든 재료를 볶아낸다.",
            modifiedDate: new Date().toISOString(),
            createdDate: new Date().toISOString(),
            userId: 5,
        },
        {
            id: 6,
            title: "된장찌개",
            name: "구수한 된장찌개",
            intro: "된장으로 만든 찌개",
            image: "https://example.com/images/soybean_stew.jpg",
            likeCount: 12,
            viewCount: 120,
            servings: 4,
            time: 30,
            level: "중급",
            cookingTools: "냄비, 국자",
            type: "찌개",
            situation: "가정식",
            ingredients: "된장, 두부, 애호박, 대파",
            method: "모든 재료를 넣고 끓인다.",
            modifiedDate: new Date().toISOString(),
            createdDate: new Date().toISOString(),
            userId: 6,
        },
        {
            id: 7,
            title: "갈비찜",
            name: "부드러운 갈비찜",
            intro: "부드럽고 맛있는 갈비찜",
            image: "https://example.com/images/galbijjim.jpg",
            likeCount: 30,
            viewCount: 300,
            servings: 4,
            time: 60,
            level: "고급",
            cookingTools: "냄비, 그릇",
            type: "찜",
            situation: "특별한 날",
            ingredients: "갈비, 간장, 설탕, 마늘",
            method: "재료를 재워서 찐다.",
            modifiedDate: new Date().toISOString(),
            createdDate: new Date().toISOString(),
            userId: 7,
        },
        {
            id: 8,
            title: "김밥",
            name: "맛있는 김밥",
            intro: "다양한 재료로 만든 김밥",
            image: "https://example.com/images/gimbap.jpg",
            likeCount: 22,
            viewCount: 220,
            servings: 3,
            time: 20,
            level: "초급",
            cookingTools: "김밥틀, 칼",
            type: "간식",
            situation: "소풍용",
            ingredients: "김, 밥, 야채, 계란",
            method: "재료를 말아서 자른다.",
            modifiedDate: new Date().toISOString(),
            createdDate: new Date().toISOString(),
            userId: 8,
        },
        {
            id: 9,
            title: "아귀찜",
            name: "매운 아귀찜",
            intro: "매콤하고 깊은 맛의 아귀찜",
            image: "https://example.com/images/agwijjim.jpg",
            likeCount: 28,
            viewCount: 280,
            servings: 4,
            time: 50,
            level: "중급",
            cookingTools: "냄비, 그릇",
            type: "찜",
            situation: "가정식",
            ingredients: "아귀, 고추장, 야채, 마늘",
            method: "모든 재료를 넣고 찐다.",
            modifiedDate: new Date().toISOString(),
            createdDate: new Date().toISOString(),
            userId: 9,
        },
    ];

    useEffect(() => {
        const params = new URLSearchParams();
        params.set("sort", sortOrderState);
        params.set("page", currentPage);
        navigate(`?${params.toString()}`);
    }, [sortOrderState, currentPage, navigate]);

    const filteredRecipes = Recipes.filter((recipe) => {
        return (
            (!selectedType ||
                selectedType === "전체" ||
                recipe.recipe_type === selectedType) &&
            (!selectedSituation ||
                selectedSituation === "전체" ||
                recipe.recipe_situation === selectedSituation) &&
            (!selectedIngredients ||
                selectedIngredients === "전체" ||
                recipe.recipe_ingredients.includes(selectedIngredients)) &&
            (!selectedMethod ||
                selectedMethod === "전체" ||
                recipe.recipe_method === selectedMethod)
        );
    });

    const sortedRecipes = [...filteredRecipes].sort((a, b) => {
        switch (sortOrderState) {
            case "최신순":
                return new Date(b.modified_date) - new Date(a.modified_date);
            case "추천순":
                return b.recipe_like_count - a.recipe_like_count;
            case "댓글순":
                return b.recipe_view_count - a.recipe_view_count;
            default:
                return 0;
        }
    });

    // 페이지네이션을 위한 현재 페이지에 맞는 레시피 선택
    const startIndex = currentPage * recipesPerPage;
    const endIndex = startIndex + recipesPerPage;
    const currentRecipes = sortedRecipes.slice(startIndex, endIndex);
    const pageCount = Math.ceil(sortedRecipes.length / recipesPerPage);

    return (
        <div>
            <SearchBar />
            {/* <CategoryIcon /> */}
            <Category
                onTypeSelect={setSelectedType}
                onSituationSelect={setSelectedSituation}
                onIngredientsSelect={setSelectedIngredients}
                onMethodSelect={setSelectedMethod}
            />
            <SortSelector
                sortOrder={sortOrderState}
                onSortChange={setSortOrder}
            />
            <RecipeList Recipes={currentRecipes} />
            <Pagination
                pageCount={pageCount}
                onPageChange={({ selected }) => setCurrentPage(selected)} // 페이지 변경 시 호출
                currentPage={currentPage} // 현재 페이지 전달
            />
        </div>
    );
};

export default SearchRecipe;
