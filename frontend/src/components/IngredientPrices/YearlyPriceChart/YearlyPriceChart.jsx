import { calculatePriceChangeRange } from "../../../util/price-range";
import { lineConfig, lineOptions } from "../../../util/get-chart-config";
import * as S from "./YearlyPriceChart.styled";
import Tag from "../../Tag/Tag";
import { useState } from "react";
import Chart from "../../Chart/Chart";

import PropTypes from "prop-types";

const YearlyPriceChart = ({ priceHistory }) => {
    const priceArr = [
        priceHistory.monthMock.map((item) => item.price),
        priceHistory.weeklyMock.map((item) => item.price),
        priceHistory.dayMock.map((item) => item.price),
    ];
    const labels = [
        priceHistory.monthMock.map((item) => item.date),
        priceHistory.weeklyMock.map((item) => item.date),
        priceHistory.dayMock.map((item) => item.date),
    ];

    const yAxis = priceArr.map((priceData) => {
        const { yAxisMin, yAxisMax } = calculatePriceChangeRange(priceData);
        return { yAxisMin, yAxisMax };
    });

    const chartOptions = yAxis.map(({ yAxisMax, yAxisMin }) =>
        lineOptions(yAxisMax, yAxisMin),
    );

    const [viewType, setViewType] = useState(0);
    const handleClick = (status) => {
        setViewType(status);
    };
    const config = lineConfig("#2DB400");
    const tag = ["월간", "주간", "일간"];
    return (
        <S.Wrapper>
            <S.TagWrapper>
                {tag.map((item, index) => (
                    <Tag
                        key={index}
                        tag={item}
                        isClicked={index === viewType}
                        onClick={() => handleClick(index)}
                    />
                ))}
            </S.TagWrapper>
            <S.ChartWrapper>
                <Chart
                    labels={labels[viewType]}
                    data={priceArr[viewType]}
                    options={chartOptions[viewType]}
                    config={config}
                />
            </S.ChartWrapper>
        </S.Wrapper>
    );
};

YearlyPriceChart.propTypes = {
    priceHistory: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default YearlyPriceChart;
