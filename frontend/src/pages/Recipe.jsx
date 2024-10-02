import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Category from "../components/Category/Category";
// import CategoryIcon from "../components/Category/CategoryIcon";
import Pagination from "../components/Pagination/Pagination";
import SortSelector from "./../components/SortSelector/SortSelector";
import RecipeList from "./../components/ReicipeList/RecipeList";
import Header from "./../components/Header/Header";
import Footer from "./../components/Footer/Footer";
import SearchBar from "./../components/SearchBar/SearchBar";

const Recipe = () => {
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
            recipe_id: 1,
            recipe_title: "김치찌개",
            recipe_name: "전통 김치찌개",
            recipe_intro: "매콤하고 깊은 맛의 김치찌개",
            recipe_image: "https://example.com/images/korean_stew.jpg",
            recipe_like_count: 10,
            recipe_view_count: 100,
            recipe_servings: 4,
            recipe_time: 30,
            recipe_level: "중급",
            recipe_cooking_tools: "냄비, 국자",
            recipe_type: "찌개",
            recipe_situation: "가정식",
            recipe_ingredients: "김치, 돼지고기, 두부, 대파",
            recipe_method: "찜",
            modified_date: new Date().toISOString(),
            created_date: new Date().toISOString(),
            user_status: true,
            user_id: 1,
        },
        {
            recipe_id: 2,
            recipe_title: "비빔밥",
            recipe_name: "비빔밥 레시피",
            recipe_intro: "신선한 야채와 고추장이 어우러진 비빔밥",
            recipe_image: "https://example.com/images/bibimbap.jpg",
            recipe_like_count: 20,
            recipe_view_count: 150,
            recipe_servings: 2,
            recipe_time: 20,
            recipe_level: "초급",
            recipe_cooking_tools: "밥솥, 그릇",
            recipe_type: "비빔",
            recipe_situation: "한끼 식사",
            recipe_ingredients: "밥, 야채, 고추장, 계란",
            recipe_method: "모든 재료를 섞어 비빈다.",
            modified_date: new Date().toISOString(),
            created_date: new Date().toISOString(),
            user_status: true,
            user_id: 2,
        },
        {
            recipe_id: 3,
            recipe_title: "불고기",
            recipe_name: "달콤한 불고기",
            recipe_intro: "달콤하고 짭짤한 소고기 요리",
            recipe_image: "https://example.com/images/bulgogi.jpg",
            recipe_like_count: 15,
            recipe_view_count: 200,
            recipe_servings: 3,
            recipe_time: 40,
            recipe_level: "중급",
            recipe_cooking_tools: "팬, 그릇",
            recipe_type: "구이",
            recipe_situation: "특별한 날",
            recipe_ingredients: "소고기, 간장, 설탕, 마늘",
            recipe_method: "재료를 재워서 팬에 구운다.",
            modified_date: new Date().toISOString(),
            created_date: new Date().toISOString(),
            user_status: true,
            user_id: 3,
        },
        {
            recipe_id: 4,
            recipe_title: "떡볶이",
            recipe_name: "매콤한 떡볶이",
            recipe_intro: "매운 소스에 버무린 떡볶이",
            recipe_image: "https://example.com/images/tteokbokki.jpg",
            recipe_like_count: 25,
            recipe_view_count: 250,
            recipe_servings: 4,
            recipe_time: 25,
            recipe_level: "초급",
            recipe_cooking_tools: "냄비, 숟가락",
            recipe_type: "간식",
            recipe_situation: "간식으로",
            recipe_ingredients: "떡, 어묵, 고추장, 설탕",
            recipe_method: "모든 재료를 넣고 끓인다.",
            modified_date: new Date().toISOString(),
            created_date: new Date().toISOString(),
            user_status: true,
            user_id: 4,
        },
        {
            recipe_id: 5,
            recipe_title: "잡채",
            recipe_name: "부드러운 잡채",
            recipe_intro: "다양한 재료와 함께 볶은 잡채",
            recipe_image: "https://example.com/images/japchae.jpg",
            recipe_like_count: 18,
            recipe_view_count: 180,
            recipe_servings: 5,
            recipe_time: 35,
            recipe_level: "중급",
            recipe_cooking_tools: "팬, 그릇",
            recipe_type: "볶음",
            recipe_situation: "연회용",
            recipe_ingredients: "당면, 야채, 소고기, 간장",
            recipe_method: "모든 재료를 볶아낸다.",
            modified_date: new Date().toISOString(),
            created_date: new Date().toISOString(),
            user_status: true,
            user_id: 5,
        },
        {
            recipe_id: 6,
            recipe_title: "된장찌개",
            recipe_name: "구수한 된장찌개",
            recipe_intro: "된장으로 만든 찌개",
            recipe_image: "https://example.com/images/soybean_stew.jpg",
            recipe_like_count: 12,
            recipe_view_count: 120,
            recipe_servings: 4,
            recipe_time: 30,
            recipe_level: "중급",
            recipe_cooking_tools: "냄비, 국자",
            recipe_type: "찌개",
            recipe_situation: "가정식",
            recipe_ingredients: "된장, 두부, 애호박, 대파",
            recipe_method: "모든 재료를 넣고 끓인다.",
            modified_date: new Date().toISOString(),
            created_date: new Date().toISOString(),
            user_status: true,
            user_id: 6,
        },
        {
            recipe_id: 7,
            recipe_title: "갈비찜",
            recipe_name: "부드러운 갈비찜",
            recipe_intro: "부드럽고 맛있는 갈비찜",
            recipe_image: "https://example.com/images/galbijjim.jpg",
            recipe_like_count: 30,
            recipe_view_count: 300,
            recipe_servings: 4,
            recipe_time: 60,
            recipe_level: "고급",
            recipe_cooking_tools: "냄비, 그릇",
            recipe_type: "찜",
            recipe_situation: "특별한 날",
            recipe_ingredients: "갈비, 간장, 설탕, 마늘",
            recipe_method: "재료를 재워서 찐다.",
            modified_date: new Date().toISOString(),
            created_date: new Date().toISOString(),
            user_status: true,
            user_id: 7,
        },
        {
            recipe_id: 8,
            recipe_title: "김밥",
            recipe_name: "맛있는 김밥",
            recipe_intro: "다양한 재료로 만든 김밥",
            recipe_image: "https://example.com/images/gimbap.jpg",
            recipe_like_count: 22,
            recipe_view_count: 220,
            recipe_servings: 3,
            recipe_time: 20,
            recipe_level: "초급",
            recipe_cooking_tools: "김밥틀, 칼",
            recipe_type: "간식",
            recipe_situation: "소풍용",
            recipe_ingredients: "김, 밥, 야채, 계란",
            recipe_method: "재료를 말아서 자른다.",
            modified_date: new Date().toISOString(),
            created_date: new Date().toISOString(),
            user_status: true,
            user_id: 8,
        },
        {
            recipe_id: 9,
            recipe_title: "아귀찜",
            recipe_name: "매운 아귀찜",
            recipe_intro: "매콤하고 깊은 맛의 아귀찜",
            recipe_image: "https://example.com/images/agwijjim.jpg",
            recipe_like_count: 28,
            recipe_view_count: 280,
            recipe_servings: 4,
            recipe_time: 50,
            recipe_level: "중급",
            recipe_cooking_tools: "냄비, 그릇",
            recipe_type: "찜",
            recipe_situation: "가정식",
            recipe_ingredients: "아귀, 고추장, 야채, 마늘",
            recipe_method: "모든 재료를 넣고 찐다.",
            modified_date: new Date().toISOString(),
            created_date: new Date().toISOString(),
            user_status: true,
            user_id: 9,
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
            <Header />
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
            <Footer />
        </div>
    );
};

export default Recipe;
