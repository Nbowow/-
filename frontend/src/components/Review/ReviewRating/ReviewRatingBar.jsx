import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useTheme } from "styled-components";
import { reviewPercentageArr } from "../../../util/review.js";
import { barLabels, config, options } from "../../../constants/bar.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Legend,
    ChartDataLabels,
);
import PropTypes from "prop-types";

function ReviewRatingBar({ rating }) {
    const dataSumPercentage = reviewPercentageArr(rating);
    const labels = barLabels();
    const barConfig = config();
    const theme = useTheme();

    const darkColor = theme.color.gray.dark;
    const data = {
        labels,
        datasets: [
            {
                data: dataSumPercentage,
                ...barConfig,
            },
        ],
    };

    const barOptions = options(rating, darkColor);

    return <Bar data={data} options={barOptions} />;
}
ReviewRatingBar.propTypes = {
    rating: PropTypes.number.isRequired,
};

export default ReviewRatingBar;
