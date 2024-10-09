import PropTypes from "prop-types";
import * as S from "./LivePriceTracker.styled";
import Chart from "../../Chart/Chart";
import {
    smallLineConfig,
    smallLineOptions,
} from "../../../util/get-chart-config";

const LivePriceTracker = ({ ingredient }) => {
    const options = smallLineOptions();

    const config = smallLineConfig("#8EC96D");
    const labels = ["1", "2", "3", "4", "6", "7"];
    const data = [10, 20, 0, 40, 10, 20, 30];
    return (
        <S.Wrapper>
            <S.ChartWrapper>
                <Chart
                    config={config}
                    labels={labels}
                    data={data}
                    options={options}
                />
            </S.ChartWrapper>
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
