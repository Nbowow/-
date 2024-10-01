import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import IngredientOverview from "../../components/IngredientPrices/IngredientOverview";
import SearchBar from "../../components/SearchBar/SearchBar";
import Slider from "../../components/IngredientPrices/LivePriceTracker/Slider";
import HotIngredient from "../../components/IngredientPrices/HotIngredient/HotIngredient";

import * as S from "./Ingredient.styled";
const Ingredient = () => {
    return (
        <>
            <Header />

            <S.Container>
                <SearchBar />
                <IngredientOverview />
                <S.RecommendSection>
                    <S.Live>
                        <Slider />
                    </S.Live>
                    <S.Hot>
                        <HotIngredient />
                        <HotIngredient />
                        <HotIngredient />
                    </S.Hot>
                    <S.Hot>
                        <HotIngredient />
                        <HotIngredient />
                        <HotIngredient />
                    </S.Hot>
                </S.RecommendSection>
            </S.Container>

            <Footer />
        </>
    );
};

export default Ingredient;
