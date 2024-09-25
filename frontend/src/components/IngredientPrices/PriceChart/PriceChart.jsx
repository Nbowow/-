import PropTypes from "prop-types";
import { useState } from "react";
import PriceDetailModal from "./PriceDetailModal";
import { monthLabels, options } from "../../../constants/chart";
import { calculatePriceChangeRange } from "../../../util/priceUtil";
import Chart from "../../Chart/Chart";
import Modal from "../../Modal/Modal";
import * as S from "./PriceChart.styled";

const PriceChart = ({ name, priceHistory }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const priceArr = priceHistory.map((item) => item.price);

    const onClick = () => {
        setModalContent(
            <PriceDetailModal name={name} priceHistory={priceHistory} />,
        );
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent(null);
    };

    const labels = monthLabels();

    const { yAxisMax, yAxisMin } = calculatePriceChangeRange(priceArr);
    const chartOptions = options(yAxisMin, yAxisMax);
    return (
        <S.ChartContainer onClick={onClick}>
            {isModalOpen && (
                <Modal context={modalContent} onClose={closeModal} />
            )}
            <Chart labels={labels} data={priceArr} options={chartOptions} />
        </S.ChartContainer>
    );
};

PriceChart.propTypes = {
    name: PropTypes.string.isRequired,
    priceHistory: PropTypes.array.isRequired,
};

export default PriceChart;
