import Chart from "react-apexcharts";

export default function ChartDonut({
    className,
    chartHeight,
    data,
    totalAverage,
}) {
    const options = {
        chart: {
            fontFamily: "IBM Plex Sans, sans-serif, ui-sans-serif, system-ui",
            height: chartHeight,
            type: "donut",
        },
        dataLabels: {
            enabled: false,
        },
        series: data,
        colors: ["#FBD8D8", "#F38886", "#0B4A86"],
        labels: ["Promoters (4 - 5)", "Neutrals (3)", "Detractors (1 - 2)"],
        legend: {
            show: true,
            floating: false,
            position: "right",
            fontSize: "12.64px",
            fontWeight: 500,
            markers: {
                width: 8,
                height: 8,
                radius: 12,
                offsetX: -8,
                offsetY: 0,
            },
            itemMargin: {
                horizontal: 0,
                vertical: 6,
            },
            offsetY: 0,
            offsetX: 0,
        },
        plotOptions: {
            pie: {
                customScale: 1,
                expandOnClick: false,
                donut: {
                    size: "58%",
                    labels: {
                        show: true,
                        name: {
                            show: true,
                        },
                        value: {
                            show: true,
                            fontSize: "14.22px",
                            fontWeight: 400,
                            color: "#B5B5B5",
                            offsetY: 0,
                            formatter: function (val) {
                                return val;
                            },
                        },
                        total: {
                            show: true,
                            showAlways: true,
                            label: totalAverage,
                            fontSize: "18px",
                            fontWeight: 400,
                            color: "#0B0A0A",
                        },
                    },
                },
            },
        },
        states: {
            normal: {
                filter: {
                    type: "none",
                    value: 0,
                },
            },
            hover: {
                filter: {
                    type: "none",
                    value: 0,
                },
            },
            active: {
                allowMultipleDataPointsSelection: false,
                filter: {
                    type: "none",
                    value: 0,
                },
            },
        },
        tooltip: {
            enabled: true,
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                const percentage = (series[seriesIndex] / 5) * 100;
                return `<div class="custom-tooltip donut">
                            <div class="tooltip-header items-center">
                                <p class="tooltip-percentage text-h3">${percentage.toFixed(1)}%</p>
                                <div class="tooltip-extra donut">+3%</div>
                            </div>
                            <div class="tooltip-label">${w.globals.labels[seriesIndex]}</div>
                        </div>`;
            },
        },
        responsive: [
            {
                breakpoint: 1350,
                options: {
                    plotOptions: {
                        pie: {
                            donut: {
                                labels: {
                                    show: true,
                                    value: {
                                        show: true,
                                        fontSize: "13px",
                                        fontFamily:
                                            "IBM Plex Sans, sans-serif, ui-sans-serif, system-ui",
                                        fontWeight: 400,
                                    },
                                    total: {
                                        show: true,
                                        fontSize: "16px",
                                        fontFamily:
                                            "IBM Plex Sans, sans-serif, ui-sans-serif, system-ui",
                                        fontWeight: 400,
                                    },
                                },
                            },
                        },
                    },
                    legend: {
                        show: false,
                        fontSize: "10px",
                        fontFamily:
                            "IBM Plex Sans, sans-serif, ui-sans-serif, system-ui",
                        fontWeight: 500,
                        markers: {
                            width: 6,
                            height: 6,
                            radius: 12,
                            offsetX: -8,
                            offsetY: 0,
                        },
                        itemMargin: {
                            horizontal: 0,
                            vertical: 4,
                        },
                        offsetX: 0,
                        offsetY: -20,
                    },
                },
            },
        ],
    };

    return (
        <>
            <style>
                {`
                    .custom-tooltip.donut {
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
                className={className}
                options={options}
                series={options.series}
                type="donut"
                height={chartHeight}
            />
        </>
    );
}
