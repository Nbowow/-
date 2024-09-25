export const barLabels = () => {
    return ["매우 만족", "만족", "보통", "별로", "매우별로"];
};

export const config = () => {
    return {
        barThickness: 8,
        borderRadius: 10,
        borderSkipped: false,
        backgroundColor: "rgb(255, 205, 86)",
        borderColor: "rgb(255, 205, 86)",
        borderWidth: 1,
        maintainAspectRatio: false,
    };
};

export const options = (data, color) => {
    return {
        indexAxis: "y",
        scales: {
            x: {
                max: 100,

                beginAtZero: true,
                stacked: true,
                display: true,
                grid: {
                    display: false,
                },
                border: {
                    display: false,
                },
                ticks: {
                    display: false,
                },
            },
            y: {
                border: {
                    display: false,
                },
                stacked: true,
                grid: {
                    display: false,
                },
            },
        },
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            datalabels: {
                anchor: "end",
                align: "end",
                formatter: (value, context) => {
                    const index = context.dataIndex;
                    const count = data[index];
                    return count;
                },
                color: color,
            },
        },
    };
};
