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
            width: 2,
        },
        markers: {
            colors: data.map((item) => item.color),
            size: 2,
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
            min: 0,
            max: 5,
            tickAmount: 5,
            lines: {
                show: true,
            },
        },
    };
    return (
        <>
            <style>
                {`
                    .chart-satisfaction-drivers {
                        min-height: ${chartHeight}px !important;
                    }

                    .apexcharts-legend {
                        margin-top: 4px;
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
