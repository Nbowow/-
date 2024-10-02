import InteractionToggle from "../../Toggle/InteractionToggle/InteractionToggle";
import Button from "../../Button/Button";
import LowestPrice from "../LowestPrice/LowestPrice";
import Title from "../../Title/Title";
import * as S from "./SearchResult.styled";
import { useState } from "react";
import YearlyPriceChart from "../YearlyPriceChart/YearlyPriceChart";

const ingredient = {
    name: "상품 A",
    price: "10000",
    img: "https://cdn.pixabay.com/photo/2015/03/14/14/00/carrots-673184_1280.jpg",
};
const priceHistory = {
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
};
const SearchResult = () => {
    const [showInfo, setShowInfo] = useState(false);
    const handleClick = () => {
        setShowInfo((prev) => !prev);
    };
    return (
        <S.Wrapper>
            <S.ResultWrapper>
                <S.ResultInfo>
                    <S.Img src={ingredient.img} alt="ingredient" />
                    <S.Label>
                        현재
                        <S.Name> {ingredient.name}</S.Name>의 가격은 평균
                        <S.Price>{ingredient.price}원</S.Price>
                        입니다.
                    </S.Label>
                    <Button text="자세히 보기" onClick={() => handleClick()} />
                </S.ResultInfo>
                <InteractionToggle type="heart" size="2rem" />
            </S.ResultWrapper>

            {showInfo && (
                <S.MoreInfo show={showInfo}>
                    <YearlyPriceChart priceHistory={priceHistory} />
                    <S.LowestPriceWrapper>
                        <Title title={"최저가"} />
                        {/* TODO: 최저가 정보를 받아와서 map 사용해 렌더링 */}
                        <LowestPrice />
                        <LowestPrice />
                        <LowestPrice />
                        <LowestPrice />
                    </S.LowestPriceWrapper>
                </S.MoreInfo>
            )}
        </S.Wrapper>
    );
};

export default SearchResult;
