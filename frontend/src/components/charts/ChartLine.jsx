import Chart from "react-apexcharts";

export default function ChartLine({
    className,
    chartHeight,
    data,
    isLegendBottom,
    labels,
}) {
    const options = {
        chart: {
            fontFamily: "IBM Plex Sans, sans-serif, ui-sans-serif, system-ui",
            type: "line",
            zoom: {
                enabled: false,
            },
        },
        legend: {
            show: true,
            position: isLegendBottom ? "bottom" : "right",
            horizontalAlign: "center",
            fontSize: "12px",
            fontFamily: "IBM Plex Sans, sans-serif, ui-sans-serif, system-ui",
            fontWeight: 500,
            offsetY: 0,
            markers: {
                width: 10,
                height: 10,
                radius: 12,
                offsetX: -4,
                offsetY: 0,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            curve: "smooth",
            width: 4,
        },
        markers: {
            colors: data.map((item) => item.color),
            size: 4,
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
        xaxis: {
            categories: labels,
            lines: {
                show: true,
            },
        },
        yaxis: {
            min: 1,
            max: 5,
            tickAmount: 4,
            lines: {
                show: true,
            },
        },
        tooltip: {
            // series: An array of arrays containing the values of all series in the chart.
            // seriesIndex: The index of the current series being processed.
            // dataPointIndex: The index of the current data point in the series.
            // w: An object that contains all the options and data for the chart.
            enabled: true,
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                let tooltipHTML = '<div class="custom-tooltip">';
                tooltipHTML += '<div class="tooltip-label">Average</div>';
                tooltipHTML += '<div class="tooltip-header">';

                // Iterar sobre todas as séries para incluir todas no tooltip
                w.config.series.forEach((serie, index) => {
                    const seriesName = serie.name;
                    const value = series[index][dataPointIndex];

                    // Checar se o valor não é nulo
                    if (value !== null) {
                        tooltipHTML += `
                        <p class="tooltip-percentage">
                            <span>${seriesName}:</span> ${value}
                        </p>`;
                    }
                });

                tooltipHTML += "</div></div>";
                return tooltipHTML;
            },
        },
    };
    return (
        <>
            <style>
                {`
                    .${className} {
                        min-height: ${chartHeight}px !important;
                    }

                    .apexcharts-legend {
                        margin-top: 8px;
                    }

                    .apexcharts-tooltip.apexcharts-theme-light {
                        border-radius: 8px;
                        border: none;
                        background: rgba(30, 30, 30, .8);
                    }
                    
                    .${className} .custom-tooltip {
                        min-width: 170px; !important
                        background-color: rgba(5, 33, 60, 0.8);
                        color: #FFFFFF;
                        text-align: left;
                        border-radius: 8px;
                        padding: 16px;
                        position: relative;
                        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
                        font-family: 'IBM Plex Sans', sans-serif;
                    }

                    .${className} .tooltip-header {
                        display: flex;
                        flex-direction: column;
                        gap: 0px;
                    }

                    .${className} .tooltip-percentage {
                        font-size: 1.266rem;
                        font-weight: 500;
                    }

                    .${className} .tooltip-percentage span {
                        font-size: 0.79rem;
                        font-weight: 500;
                    }

                    .${className} .tooltip-label {
                        font-size: 0.889rem;
                        margin-top: -4px;
                    }
                `}
            </style>
            <Chart
                className={className}
                options={options}
                series={data}
                type="line"
                height={chartHeight}
            />
        </>
    );
}
