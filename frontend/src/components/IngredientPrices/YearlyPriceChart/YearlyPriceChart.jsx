import PropTypes from "prop-types";
import Chart from "../../Chart/Chart";
import { monthLabels } from "../../../constants/chart";
import { calculatePriceChangeRange } from "../../../util/price-range";
import { lineOptions } from "../../../util/get-chart-config";

function YearlyPriceChart({ priceHistory }) {
    const labels = monthLabels();
    const priceArr = Object.values(priceHistory).map((price) =>
        parseInt(price, 10),
    );

    const { yAxisMin, yAxisMax } = calculatePriceChangeRange(priceArr);
    const chartOptions = lineOptions(yAxisMin, yAxisMax);

    return <Chart labels={labels} data={priceArr} options={chartOptions} />;
}

export default YearlyPriceChart;

YearlyPriceChart.propTypes = {
    priceHistory: PropTypes.object.isRequired,
};
