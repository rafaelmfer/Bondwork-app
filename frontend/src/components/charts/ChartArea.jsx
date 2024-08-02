import React from "react";
import Chart from "react-apexcharts";
import { getChipColors, formatChipLabel } from "../chip/ChipNumber";
import theme from "../../theme/theme";

export default function ChartArea({
    className,
    chartHeight,
    chartData,
    labels,
}) {
    const options = {
        chart: {
            fontFamily: "IBM Plex Sans, sans-serif, ui-sans-serif, system-ui",
            height: chartHeight,
            type: "area",
        },
        dataLabels: {
            enabled: false,
        },
        series: [
            {
                name: "Average",
                data: chartData,
            },
        ],
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.8,
                opacityTo: 0,
                stops: [0, 90, 100],
            },
        },
        stroke: {
            show: true,
            curve: "smooth",
            width: 2,
        },
        colors: ["#F38886"],
        markers: {
            colors: ["#F38886"],
            size: 3,
            strokeColors: "#fff",
            strokeWidth: 0,
            strokeOpacity: 0.9,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [],
            shape: "circle",
            radius: 2,
            offsetX: 0,
            offsetY: 0,
            onClick: undefined,
            onDblClick: undefined,
            showNullDataPoints: false,
            hover: {
                size: undefined,
                sizeOffset: 2,
            },
        },
        legend: {
            show: false,
            position: "top",
            horizontalAlign: "right",
            fontSize: "12px",
            fontFamily: "IBM Plex Sans, sans-serif, ui-sans-serif, system-ui",
            fontWeight: 500,
            
            labels: {
                colors: theme.palette.neutrals.black, // Define a cor da legenda
            },
        },
        tooltip: {
            // series: An array of arrays containing the values of all series in the chart.
            // seriesIndex: The index of the current series being processed.
            // dataPointIndex: The index of the current data point in the series.
            // w: An object that contains all the options and data for the chart.
            enabled: true,
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
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
                                <h3 class="tooltip-percentage text-h3">${series[seriesIndex][dataPointIndex]}</p>
                                ${showBadge}
                            </div>
                            <div class="tooltip-label">${w.globals.seriesNames[seriesIndex]}</div>
                        </div>`;
            },
        },
        xaxis: {
            categories: labels,
        },
        yaxis: {
            min: 0,
            max: 5,
            tickAmount: 5,
            labels: {
                style: {
                    colors: theme.palette.neutrals.black,
                },
            },
        },
    };

    return (
        <>
            <style>
                {`
                    .${className} .apexcharts-tooltip.apexcharts-theme-light {
                        border-radius: 8px;
                        border: none;
                        background: rgba(30, 30, 30, .8);
                    }

                    .custom-tooltip {
                        min-width: 150px;
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

                    .tooltip-extra {
                        border-radius: 12px;
                        padding: 2px 12px;
                        font-size: 16px;
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        justify-content: center;
                        height: 20px;
                    }

                    .tooltip-label {
                        font-size: 12.64px;
                        margin-top: 4px;
                    }
                `}
            </style>
            <Chart
                className={className}
                options={options}
                series={options.series}
                type="area"
                height={chartHeight}
            />
        </>
    );
}
