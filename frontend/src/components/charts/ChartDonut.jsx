import Chart from "react-apexcharts";

export default function ChartDonut({ className, chartHeight }) {
    const options = {
        chart: {
            fontFamily: "IBM Plex Sans, sans-serif, ui-sans-serif, system-ui",
            height: chartHeight,
            type: "donut",
        },
        dataLabels: {
            enabled: false,
        },
        series: [2.5, 1.5, 1],
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
                            label: "4.5",
                            fontSize: "18px",
                            fontWeight: 400,
                            color: "#0B0A0A",
                        },
                    },
                },
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
        <Chart
            className={className}
            options={options}
            series={options.series}
            type="donut"
            height={chartHeight}
        />
    );
}
