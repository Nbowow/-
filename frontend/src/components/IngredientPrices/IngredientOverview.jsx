import PropType from "prop-types";
import { useEffect, useState } from "react";
import * as S from "./IngredientOverview.styled";
import IntroCard from "../Card/IntroCard/IntroCard";
import YearlyPriceChart from "./YearlyPriceChart/YearlyPriceChart";
import Title from "../Title/Title";
import LikeIngredient from "./LikeIngredient/LikeIngredient";
import Tab from "../Tab/Tab";
import LowestPrice from "./LowestPrice/LowestPrice";
import { getIngredientPrices } from "../../api/ingredientApi";

const item = {
    title: "김치찌개",
    text: "잘 익은 김치와 돼지고기를 넣어 끓인 매콤한 찌개로, 추운 겨울에 몸을 데워줍니다.",
    imgUrl: "https://img.bizthenaum.co.kr/data/img/1000000869/ori/1000000869_11.jpg",
};
const IngredientOverview = ({ like, onLike }) => {
    const [rowIdx, setRowIdx] = useState(0);
    const [priceHistory, setPriceHistory] = useState(null);
    useEffect(() => {
        const fetchIngredientPrices = async () => {
            const result = await getIngredientPrices(rowIdx);
            setPriceHistory(result);
        };
        fetchIngredientPrices();
    }, [rowIdx]);

    const clickHandler = (idx) => {
        setRowIdx(idx);
    };
    const tabs = [
        {
            label: "물가동향",
            content: (
                <>
                    {priceHistory && (
                        <YearlyPriceChart priceHistory={priceHistory} />
                    )}
                </>
            ),
        },
        {
            label: "최저가",
            content: (
                <>
                    <LowestPrice />
                    <LowestPrice />
                    <LowestPrice />
                </>
            ),
        },
    ];

    return (
        <>
            <S.IngredientLikeSection>
                <Title title={"나의 식재료"} />
                <S.Wrapper>
                    <LikeIngredient
                        onClick={clickHandler}
                        ingredients={like}
                        onLike={onLike}
                    />
                    <S.TabWrapper>
                        <Tab tabs={tabs} />
                    </S.TabWrapper>
                </S.Wrapper>
            </S.IngredientLikeSection>
            <S.RelatedRecipeWrapper>
                <Title title={"관련 레시피"} />
                <S.RelatedRecipe>
                    <IntroCard
                        title={item.title}
                        text={item.text}
                        imgUrl={item.imgUrl}
                    />
                    <IntroCard
                        title={item.title}
                        text={item.text}
                        imgUrl={item.imgUrl}
                    />
                    <IntroCard
                        title={item.title}
                        text={item.text}
                        imgUrl={item.imgUrl}
                    />
                </S.RelatedRecipe>
            </S.RelatedRecipeWrapper>
        </>
    );
};

IngredientOverview.propTypes = {
    like: PropType.array,
    onLike: PropType.func,
};
export default IngredientOverview;
