import Chart from "react-apexcharts";
import theme from "../../theme/theme";

export default function ChartLineRecognition({ className, chartHeight }) {
    const options = {
        chart: {
            fontFamily: "IBM Plex Sans, sans-serif, ui-sans-serif, system-ui",
            type: "line",
            zoom: {
                enabled: false,
            },
        },
        series: [
            {
                name: "Total",
                data: [50, 45.9, 43, 52, 48, 55, null],
                color: "#8F0A06",
            },
            {
                name: "Great Performance",
                data: [10.9, 20, 25.7, 33.5, 27.3, 25.5, null],
                color: "#B1D6F9",
            },
            {
                name: "Leadership",
                data: [20, 20.3, 20.5, 20.8, 30, 33, null],
                color: "#2774BC",
            },
            {
                name: "Support",
                data: [40.5, 35.2, 30.7, 38.6, 40.5, 42.1, null],
                color: "#FBD8D8",
            },
            {
                name: "Customer Center",
                data: [20.6, 23.6, 25.9, 30.3, 35.3, 40.3, null],
                color: "#EF6461",
            },
        ],
        legend: {
            show: true,
            position: "bottom",
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
            labels: {
                colors: theme.palette.neutrals.black,
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
            categories: ["23", "24", "26", "27", "28", "29", "30"],
            lines: {
                show: true,
            },
            labels: {
                style: {
                    colors: theme.palette.neutrals.black,
                },
            },
        },
        yaxis: {
            min: 0,
            max: 100,
            tickAmount: 5,
            lines: {
                show: true,
            },
            labels: {
                style: {
                    colors: theme.palette.neutrals.black,
                },
            },
        },
    };
    return (
        <Chart
            className={className}
            options={options}
            series={options.series}
            type="line"
            height={chartHeight}
        />
    );
}
