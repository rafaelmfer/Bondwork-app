import Chart from "react-apexcharts";

export default function ChartLine({
    className,
    chartHeight,
    data,
    isLegendBottom,
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
            colors: ["#8F0A06", "#B1D6F9", "#2774BC", "#FBD8D8", "#EF6461"],
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
            categories: ["19", "20", "21", "22", "23", "24", "25"],
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
        <Chart
            className={className}
            options={options}
            series={data}
            type="line"
            height={chartHeight}
        />
    );
}
