import Chart from "react-apexcharts";
import { getChipColors, formatChipLabel } from "../chip/ChipNumber";

const ChartNegativeArea = ({ data }) => {
    const referenceValue = 10;

    const adjustedData = data.series.map((value, index) => ({
        x: data.categories[index] ? data.categories[index] : [1],
        y: value - referenceValue,
    }));

    const positiveSeries = adjustedData.map((item) => ({
        x: item.x,
        y: Math.min(item.y, 0),
    }));

    const negativeSeries = adjustedData.map((item) => ({
        x: item.x,
        y: Math.max(item.y, 0),
    }));

    const chartOptions = {
        chart: {
            type: "area",
            height: 280,
        },
        stroke: {
            curve: "smooth",
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.3,
                opacityTo: 0.9,
            },
        },
        dataLabels: {
            enabled: false,
        },
        series: [
            {
                name: "Turnover Rate",
                data: adjustedData,
                color: "#CA310F",
            },
            //   {
            //     name: "Positive Series",
            //     data: positiveSeries,
            //     color: "#CA310F",
            //   },
            //   {
            //     name: "Negative Series",
            //     data: negativeSeries,
            //     color: "#30BC3E",
            //   },
        ],
        legend: {
            show: false,
            position: "top",
            horizontalAlign: "right",
            fontSize: "14px",
            fontFamily: "Inter",
            fontWeight: 400,
            offsetY: -16,
            labels: {
                colors: "#8e8da4",
            },
        },
        xaxis: {
            categories: data.categories,
        },
        yaxis: {
            min: -referenceValue,
            max: 5,
            tickAmount: 4,
            labels: {
                formatter: (value) => value + referenceValue,
                style: {
                    colors: "#8e8da4",
                },
                offsetY: 0,
                offsetX: 0,
            },
        },
        tooltip: {
            // series: An array of arrays containing the values of all series in the chart.
            // seriesIndex: The index of the current series being processed.
            // dataPointIndex: The index of the current data point in the series.
            // w: An object that contains all the options and data for the chart.
            enabled: true,
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                const category = w.globals.labels[dataPointIndex];
                const prefix = seriesIndex === 0 ? "Previous" : "Current";
                const badgeNumber =
                    seriesIndex === 1
                        ? series[seriesIndex][dataPointIndex] -
                          series[seriesIndex - 1][dataPointIndex]
                        : 0;
                const { chipBackground, chipTextColor } =
                    getChipColors(badgeNumber);
                const showBadge =
                    seriesIndex === 1
                        ? `<div class="tooltip-extra" style="background-color: ${chipBackground};
                        color: ${chipTextColor};">${formatChipLabel(badgeNumber)}</div>`
                        : ``;
                return `<div class="custom-tooltip">
                            <div class="tooltip-header items-center">
                                <h3 class="tooltip-percentage text-h3">${(series[seriesIndex][dataPointIndex] + 10).toFixed(2)}%</p>
                                ${showBadge}
                            </div>
                            <div class="tooltip-label">${w.globals.seriesNames[seriesIndex]}</div>
                        </div>`;
            },
        },
    };

    return (
        <>
            <style>
                {`
                    .chart-turn-over {
                        min-height: 205px !important;
                    }

                    .chart-turn-over .apexcharts-tooltip.apexcharts-theme-light {
                        border-radius: 8px;
                        border: none;
                        background: rgba(30, 30, 30, .8);
                    }

                    .custom-tooltip {
                        width: 170px;
                        background-color: rgba(5, 33, 60, 0.8);
                        color: #FFFFFF;
                        text-align: left;
                        border-radius: 8px;
                        padding: 16px;
                        position: relative;
                        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
                        font-family: 'IBM Plex Sans', sans-serif;
                    }

                    .tooltip-header {
                        display: flex;
                        flex-direction: row;
                        gap: 6px;
                    }

                    .tooltip-percentage {
                        font-weight: 500;
                    }

                    .tooltip-extra.donut {
                        background-color: #D3F9D8;
                        color: #4CAF50;
                        border-radius: 12px;
                        padding: 2px 6px;
                        font-size: 16px;
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        justify-content: center;
                        height: 20px;
                    }

                    .tooltip-label {
                        font-size: 14px;
                        margin-top: 8px;
                    }
                `}
            </style>
            <Chart
                className={"chart-turn-over"}
                options={chartOptions}
                series={chartOptions.series}
                type="area"
                height={205}
            />
        </>
    );
};

export default ChartNegativeArea;
