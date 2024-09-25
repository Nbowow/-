import PropTypes from "prop-types";
import Chart from "../../Chart/Chart";
import { monthLabels, options } from "../../../constants/chart";
import { calculatePriceChangeRange } from "../../../util/priceUtil";

function YearlyPriceChart({ priceHistory }) {
    const labels = monthLabels();
    const priceArr = Object.values(priceHistory).map((price) =>
        parseInt(price, 10),
    );

    const { yAxisMin, yAxisMax } = calculatePriceChangeRange(priceArr);
    const chartOptions = options(yAxisMin, yAxisMax);

    return <Chart labels={labels} data={priceArr} options={chartOptions} />;
}

export default YearlyPriceChart;

YearlyPriceChart.propTypes = {
    priceHistory: PropTypes.object.isRequired,
};
