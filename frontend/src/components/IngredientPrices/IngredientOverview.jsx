import PropType from "prop-types";
import { useEffect, useState } from "react";
import * as S from "./IngredientOverview.styled";
import YearlyPriceChart from "./YearlyPriceChart/YearlyPriceChart";
import Title from "../Title/Title";
import LikeIngredient from "./LikeIngredient/LikeIngredient";
import Tab from "../Tab/Tab";
import { getIngredientPrices } from "../../api/ingredientApi";
import LowestPrices from "./LowestPrice/LowestPrices";
import RelatedRecipe from "./RelatedRecipe";

const IngredientOverview = ({ like, onLike }) => {
    const [rowIdx, setRowIdx] = useState(0);
    const [priceHistory, setPriceHistory] = useState(null);
    const [name, setName] = useState(null);

    useEffect(() => {
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
    );
};

IngredientOverview.propTypes = {
    like: PropType.array,
    onLike: PropType.func,
};
export default IngredientOverview;
