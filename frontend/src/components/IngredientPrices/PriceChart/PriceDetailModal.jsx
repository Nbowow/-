import Chart from "../../Chart/Chart";
import Table from "../../Table/Table";
import PropTypes from "prop-types";
import * as S from "./PriceChart.styled";
import { useMemo } from "react";
import { options } from "../../../constants/chart";
import { calculatePriceChangeRange } from "../../../util/priceUtil";
import { useIngredientPriceColumns } from "../../Table/TableColumn";

const PriceDetailModal = ({ name, priceHistory }) => {
    const chartData = priceHistory.map((item) => Number(item.price));

    const { yAxisMin, yAxisMax } = calculatePriceChangeRange(chartData);

    const tableColumns = useIngredientPriceColumns();
    const chartOptions = options(yAxisMin, yAxisMax);
    const ChartLabels = priceHistory.map((item) => item.date);
    const tableData = useMemo(() => priceHistory, [priceHistory]);

    return (
        <S.PriceDetailWrapper>
            <S.ProductInfo>
                <S.ProductName>{name}</S.ProductName>
                <S.ProductLabel>주별 가격 추이</S.ProductLabel>
            </S.ProductInfo>
            <S.ChartWrapper>
                <Chart
                    labels={ChartLabels}
                    data={chartData}
                    options={chartOptions}
                />
            </S.ChartWrapper>
            <Table data={tableData} columns={tableColumns} />
        </S.PriceDetailWrapper>
    );
};

PriceDetailModal.propTypes = {
    name: PropTypes.string.isRequired,
    priceHistory: PropTypes.array.isRequired,
};

export default PriceDetailModal;
