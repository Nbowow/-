import PropTypes from "prop-types";
import { useState } from "react";
import { getIngredientPrices } from "../../../api/ingredientApi";
import InteractionToggle from "../../Toggle/InteractionToggle/InteractionToggle";
import Button from "../../Button/Button";
import LowestPrice from "../LowestPrice/LowestPrice";
import Title from "../../Title/Title";
import * as S from "./SearchResult.styled";
import YearlyPriceChart from "../YearlyPriceChart/YearlyPriceChart";

const SearchResult = ({ result, onLike, like }) => {
    const [showInfo, setShowInfo] = useState(false);
    const [priceHistory, setPriceHistory] = useState();
    const handleClick = async () => {
        const data = await getIngredientPrices(result.id);
        setPriceHistory(data);
        setShowInfo((prev) => !prev);
    };
    return (
        <S.Wrapper>
            {result.name !== "Unknown" ? (
                <>
                    <S.ResultWrapper>
                        <S.ResultInfo>
                            <S.Img
                                src={result.ingredientImage}
                                alt="ingredient"
                            />
                            <S.Label>
                                <S.Name>{result.name}</S.Name>
                            </S.Label>
                            <Button
                                text="자세히 보기"
                                onClick={() => handleClick()}
                            />
                        </S.ResultInfo>
                        <InteractionToggle
                            isActive={like}
                            onClick={() => onLike(result)}
                            type="heart"
                            size="1.5rem"
                        />
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
                </>
            ) : (
                <div>검색 결과가 없습니다</div>
            )}
        </S.Wrapper>
    );
};

SearchResult.propTypes = {
    result: PropTypes.object.isRequired,
    onLike: PropTypes.func,
    like: PropTypes.bool,
};
export default SearchResult;
