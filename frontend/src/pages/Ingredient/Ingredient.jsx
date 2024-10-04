import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import IngredientOverview from "../../components/IngredientPrices/IngredientOverview";
import SearchBar from "../../components/SearchBar/SearchBar";
import Slider from "../../components/IngredientPrices/LivePriceTracker/Slider";
import HotIngredient from "../../components/IngredientPrices/HotIngredient/HotIngredient";

import * as S from "./Ingredient.styled";
import Title from "../../components/Title/Title";
import SearchResult from "../../components/IngredientPrices/SearchResult/SearchResult";
const Ingredient = () => {
    return (
        <>
            <Header />

            <S.Container>
                <SearchBar
                    userId={"test"}
                    purpose={"ingredient"}
                    boldPlacehold={"어떤 재료를 찾고 계신가요?"}
                    grayPlacehold={
                        "재료명을 입력하고 현재 시세를 확인해보세요."
                    }
                />

                {/* TODO: 검색 결과에 따른 렌더링 */}
                <SearchResult />
                <SearchResult />

                <IngredientOverview />
                <S.RecommendSection>
                    <S.Hot>
                        <Title title={"주간 인기 재료"} />
                        <HotIngredient />
                        <HotIngredient />
                        <HotIngredient />
                    </S.Hot>
                    <S.Hot>
                        <Title title={"월간 인기 재료"} />
                        <HotIngredient />
                        <HotIngredient />
                        <HotIngredient />
                    </S.Hot>
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
