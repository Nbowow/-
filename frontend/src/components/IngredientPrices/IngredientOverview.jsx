import PropType from "prop-types";
import { useEffect, useState } from "react";
import * as S from "./IngredientOverview.styled";
import YearlyPriceChart from "./YearlyPriceChart/YearlyPriceChart";
import Title from "../Title/Title";
import LikeIngredient from "./LikeIngredient/LikeIngredient";
import Tab from "../Tab/Tab";
import { getIngredientPrices } from "../../api/ingredientApi";
import LowestPrices from "./LowestPrice/LowestPrices";
import RelatedRecipe from "./RelatedRecipe/RelatedRecipe";
import EmptyPlaceHolder from "../EmptyPlaceholder/EmptyPlaceHolder";

const IngredientOverview = ({ like, onLike }) => {
    const [rowIdx, setRowIdx] = useState(0);
    const [priceHistory, setPriceHistory] = useState(null);
    const [name, setName] = useState(null);

    useEffect(() => {
        if (like.length === 0) return;
        const fetchIngredientPrices = async () => {
            const result = await getIngredientPrices(like[rowIdx].id);
            setPriceHistory(result);
            setName(like[rowIdx].name);
        };
        fetchIngredientPrices();
    }, [rowIdx, like]);

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
                    <LowestPrices name={name} />
                </>
            ),
        },
    ];

    return (
        <>
            {like.length > 0 ? (
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
                            <RelatedRecipe like={like} />
                        </S.RelatedRecipe>
                    </S.RelatedRecipeWrapper>
                </>
            ) : (
                <EmptyPlaceHolder
                    width="70%"
                    height="15rem"
                    recommend="재료의 최저가와 관련된 레시피를 확인할 수 있어요. !"
                    content="좋아요를 눌러 재료를 등록해보세요."
                />
            )}
        </>
    );
};

IngredientOverview.propTypes = {
    like: PropType.array,
    onLike: PropType.func,
};
export default IngredientOverview;
