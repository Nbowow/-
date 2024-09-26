import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from "chart.js";
import PropTypes from "prop-types";
import { useTheme } from "styled-components";
import { lineConfig } from "../../util/get-chart-config";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
);

const Chart = ({ labels, data, options }) => {
    const {
        color: {
            point: { green },
        },
    } = useTheme();
    const chartConfig = lineConfig(green);

    const chartData = {
        labels,
        datasets: [
            {
                data: data,
                ...chartConfig,
            },
        ],
    };

    return <Line data={chartData} options={options} />;
};

Chart.propTypes = {
    labels: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    options: PropTypes.object.isRequired,
};
export default Chart;
