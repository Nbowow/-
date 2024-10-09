import Footer from "../../components/Footer/Footer";
import IngredientOverview from "../../components/IngredientPrices/IngredientOverview";
import SearchBar from "../../components/SearchBar/SearchBar";
import Slider from "../../components/IngredientPrices/LivePriceTracker/Slider";
import * as S from "./Ingredient.styled";
import Title from "../../components/Title/Title";
import HotMonthIngredients from "../../components/IngredientPrices/HotIngredient/HotMonthIngredients";
import SearchResult from "../../components/IngredientPrices/SearchResult/SearchResult";

import {
    deleteLikeIngredient,
    getLikeIngredients,
    getSearchIngredient,
    postLikeIngredient,
} from "../../api/ingredientApi";

import { useEffect, useState } from "react";
import HotWeekIngredients from "../../components/IngredientPrices/HotIngredient/HotWeekIngredients";
import { useUserStore } from "../../store/userStore";

const Ingredient = () => {
    const [searchResult, setSearchResult] = useState(null);
    const [likeIngredients, setLikeIngredients] = useState([]);
    const handleLike = (ingredient) => {
        const isLiked = likeIngredients.find((i) => i.id === ingredient.id);
        setLikeIngredients((prev) =>
            isLiked
                ? prev.filter((el) => el.id !== ingredient.id)
                : [...prev, ingredient],
        );

        if (isLiked) {
            deleteLikeIngredient(ingredient.id);
        } else {
            postLikeIngredient(ingredient.id);
        }
    };

    const isLoggedIn = useUserStore((state) => state.isLoggedIn);
    useEffect(() => {
        if (!isLoggedIn) return;
        const fetchLikeIngredients = async () => {
            const result = await getLikeIngredients();
            setLikeIngredients(result);
        };
        fetchLikeIngredients();
    }, [isLoggedIn]);

    const handleSearch = async (searchTerm) => {
        const result = await getSearchIngredient(searchTerm);
        setSearchResult(result);
    };

    return (
        <>
            <S.Container>
                <SearchBar
                    userId={"test"}
                    purpose={"ingredient"}
                    boldPlacehold={"어떤 재료를 찾고 계신가요?"}
                    grayPlacehold={
                        "재료명을 입력하고 현재 시세를 확인해보세요."
                    }
                    onSubmit={(term) => handleSearch(term)}
                />
                {searchResult ? (
                    <SearchResult
                        onLike={handleLike}
                        result={searchResult}
                        like={likeIngredients.find(
                            (i) => i.id === searchResult.id,
                        )}
                    />
                ) : null}
                {isLoggedIn && (
                    <IngredientOverview
                        like={likeIngredients}
                        onLike={handleLike}
                    />
                )}
                <S.RecommendSection>
                    <HotWeekIngredients
                        like={likeIngredients}
                        onLike={handleLike}
                    />
                    <HotMonthIngredients
                        like={likeIngredients}
                        onLike={handleLike}
                    />
                    <S.Live>
                        <Title title={"실시간 물가 변동"} />
                        <Slider />
                    </S.Live>
                </S.RecommendSection>
            </S.Container>

            <Footer />
        </>
    );
};

export default Ingredient;
