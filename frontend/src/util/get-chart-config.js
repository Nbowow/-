export const lineOptions = (yAxisMax, yAxisMin) => {
    return {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: false },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                ticks: {
                    max: yAxisMax,
                    min: yAxisMin,
                },
            },
        },
    };
};

const hexToRgba = (hex, opacity) => {
    hex = hex.replace("#", "");
    if (hex.length === 3) {
        hex = hex
            .split("")
            .map((char) => char + char)
            .join("");
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const lineConfig = (color) => {
    return {
        borderColor: color,
        backgroundColor: (context) => {
            const bgColors = [
                hexToRgba(color, 0.6),
                hexToRgba(color, 0.3),
                hexToRgba(color, 0.2),
            ];
            if (!context.chart.chartArea) {
                return null;
            }
            const {
                ctx,
                chartArea: { top, bottom },
            } = context.chart;

            const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
            gradientBg.addColorStop(0.3, bgColors[0]);
            gradientBg.addColorStop(0.7, bgColors[1]);
            gradientBg.addColorStop(1, bgColors[2]);

            return gradientBg;
        },
        fill: true,
        borderWidth: 3,
        pointRadius: 2,
        pointBackgroundColor: color,
        pointBorderColor: color,
        pointHoverRadius: 8,
        tension: 0.4,
    };
};

export const barConfig = (color) => {
    return {
        barThickness: 5,
        borderRadius: 10,
        backgroundColor: color,
        borderColor: color,
    };
};

export const barOptions = (data, color) => {
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
                ticks: {
                    display: true,
                    font: {
                        size: 11,
                    },
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
