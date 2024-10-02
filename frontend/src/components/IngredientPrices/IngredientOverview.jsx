import { useState } from "react";
import * as S from "./IngredientOverview.styled";
import IntroCard from "../Card/IntroCard/IntroCard";
import Tab from "../Tab/Tab";
import PieChart from "../Chart/PieChart";
import YearlyPriceChart from "./YearlyPriceChart/YearlyPriceChart";
import Title from "../Title/Title";
import LikeIngredient from "./LikeIngredient/LikeIngredient";
const like = [
    {
        name: "상품 A",
        price: "10000",
        img: "https://cdn.pixabay.com/photo/2015/03/14/14/00/carrots-673184_1280.jpg",
        priceHistory: {
            monthMock: [
                { date: "23.09", price: "10000" },
                { date: "23.10", price: "10200" },
                { date: "23.11", price: "10150" },
                { date: "23.12", price: "8300" },
                { date: "24.01", price: "10400" },
                { date: "24.02", price: "9500" },
                { date: "24.03", price: "10600" },
                { date: "24.04", price: "10750" },
                { date: "24.05", price: "14800" },
                { date: "24.06", price: "10900" },
                { date: "24.07", price: "11000" },
                { date: "24.08", price: "11100" },
            ],
            dayMock: [
                { date: "24.09.02", price: "1100" },
                { date: "24.09.03", price: "1200" },
                { date: "24.09.04", price: "1000" },
                { date: "24.09.05", price: "1100" },
                { date: "24.09.06", price: "1000" },
                { date: "24.09.07", price: "1000" },
                { date: "24.09.08", price: "1000" },
                { date: "24.09.09", price: "1100" },
                { date: "24.09.10", price: "1100" },
                { date: "24.09.11", price: "1000" },
                { date: "24.09.12", price: "1000" },
                { date: "24.09.13", price: "1000" },
            ],
            weeklyMock: [
                { date: "24.09 1주차", price: "1100" },
                { date: "24.09 2주차", price: "1200" },
                { date: "24.09 3주차", price: "1000" },
                { date: "24.09 4주차", price: "1100" },
                { date: "24.10 1주차", price: "1000" },
                { date: "24.10 2주차", price: "1000" },
                { date: "24.10 3주차", price: "1000" },
                { date: "24.10 4주차", price: "1100" },
                { date: "24.11 1주차", price: "1100" },
                { date: "24.11 2주차", price: "1000" },
                { date: "24.11 3주차", price: "1000" },
                { date: "24.11 4주차", price: "1000" },
            ],
        },
    },
    {
        name: "상품 B",
        price: "15000",
        img: "https://cdn.pixabay.com/photo/2015/03/14/14/00/carrots-673184_1280.jpg",
        priceHistory: {
            monthMock: [
                { date: "23.09", price: "10000" },
                { date: "23.10", price: "10200" },
                { date: "23.11", price: "10150" },
                { date: "23.12", price: "8300" },
                { date: "24.01", price: "10400" },
                { date: "24.02", price: "9500" },
                { date: "24.03", price: "10600" },
                { date: "24.04", price: "10750" },
                { date: "24.05", price: "14800" },
                { date: "24.06", price: "10900" },
                { date: "24.07", price: "11000" },
                { date: "24.08", price: "11100" },
            ],
            dayMock: [
                { date: "24.09.02", price: "1100" },
                { date: "24.09.03", price: "1200" },
                { date: "24.09.04", price: "1000" },
                { date: "24.09.05", price: "1100" },
                { date: "24.09.06", price: "1000" },
                { date: "24.09.07", price: "1000" },
                { date: "24.09.08", price: "1000" },
                { date: "24.09.09", price: "1100" },
                { date: "24.09.10", price: "1100" },
                { date: "24.09.11", price: "1000" },
                { date: "24.09.12", price: "1000" },
                { date: "24.09.13", price: "1000" },
            ],
            weeklyMock: [
                { date: "24.09 1주차", price: "1100" },
                { date: "24.09 2주차", price: "1200" },
                { date: "24.09 3주차", price: "1000" },
                { date: "24.09 4주차", price: "1100" },
                { date: "24.10 1주차", price: "1000" },
                { date: "24.10 2주차", price: "1000" },
                { date: "24.10 3주차", price: "1000" },
                { date: "24.10 4주차", price: "1100" },
                { date: "24.11 1주차", price: "1100" },
                { date: "24.11 2주차", price: "1000" },
                { date: "24.11 3주차", price: "1000" },
                { date: "24.11 4주차", price: "1000" },
            ],
        },
    },
    {
        name: "상품 C",
        price: "12000",
        img: "https://cdn.pixabay.com/photo/2015/03/14/14/00/carrots-673184_1280.jpg",
        priceHistory: {
            monthMock: [
                { date: "23.09", price: "10000" },
                { date: "23.10", price: "10200" },
                { date: "23.11", price: "10150" },
                { date: "23.12", price: "8300" },
                { date: "24.01", price: "10400" },
                { date: "24.02", price: "9500" },
                { date: "24.03", price: "10600" },
                { date: "24.04", price: "10750" },
                { date: "24.05", price: "14800" },
                { date: "24.06", price: "10900" },
                { date: "24.07", price: "11000" },
                { date: "24.08", price: "11100" },
            ],
            dayMock: [
                { date: "24.09.02", price: "1100" },
                { date: "24.09.03", price: "1200" },
                { date: "24.09.04", price: "1000" },
                { date: "24.09.05", price: "1100" },
                { date: "24.09.06", price: "1000" },
                { date: "24.09.07", price: "1000" },
                { date: "24.09.08", price: "1000" },
                { date: "24.09.09", price: "1100" },
                { date: "24.09.10", price: "1100" },
                { date: "24.09.11", price: "1000" },
                { date: "24.09.12", price: "1000" },
                { date: "24.09.13", price: "1000" },
            ],
            weeklyMock: [
                { date: "24.09 1주차", price: "10009" },
                { date: "24.09 2주차", price: "20000" },
                { date: "24.09 3주차", price: "10000" },
                { date: "24.09 4주차", price: "30000" },
                { date: "24.10 1주차", price: "40000" },
                { date: "24.10 2주차", price: "40000" },
                { date: "24.10 3주차", price: "50000" },
                { date: "24.10 4주차", price: "100000" },
                { date: "24.11 1주차", price: "20000" },
                { date: "24.11 2주차", price: "30000" },
                { date: "24.11 3주차", price: "40500" },
                { date: "24.11 4주차", price: "40000" },
            ],
        },
    },
];
const item = {
    title: "김치찌개",
    text: "잘 익은 김치와 돼지고기를 넣어 끓인 매콤한 찌개로, 추운 겨울에 몸을 데워줍니다.",
    imgUrl: "https://img.bizthenaum.co.kr/data/img/1000000869/ori/1000000869_11.jpg",
};
const IngredientOverview = () => {
    const [ingredient, setIngredient] = useState(0);
    const clickHandler = (rowIdx) => {
        setIngredient(rowIdx);
    };

    const tab = [
        {
            label: "가격 변동률",
            content: (
                <YearlyPriceChart
                    priceHistory={like[ingredient].priceHistory}
                />
            ),
        },
        { label: "칼로리", content: <PieChart /> },
    ];
    return (
        <>
            <S.IngredientLikeSection>
                <Title title={"나의 식재료"} />
                <S.Wrapper>
                    <LikeIngredient onClick={clickHandler} ingredients={like} />
                    <S.TabWrapper>
                        <Tab tabs={tab} />
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

export default IngredientOverview;
