import PropTypes from "prop-types";
import * as S from "./LivePriceTracker.styled";

const LivePriceTracker = ({ ingredient }) => {
    return (
        <S.Wrapper>
            <S.IngredientInfo>
                <S.IngredientInfoLayout>
                    <S.IngredientName>{ingredient.name}</S.IngredientName>
                </S.IngredientInfoLayout>
                <S.IngredientLabel>
                    어제보다
                    <S.IngredientPrice>
                        {ingredient.priceGap}원
                    </S.IngredientPrice>
                    저렴해요 !
                </S.IngredientLabel>
            </S.IngredientInfo>
        </S.Wrapper>
    );
};

LivePriceTracker.propTypes = {
    ingredient: PropTypes.object.isRequired,
};
export default LivePriceTracker;
