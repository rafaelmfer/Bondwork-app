import Chart from "react-apexcharts";

export default function ChartLine({ chartHeight }) {
    const options = {
        series: [
            {
                name: "Overall",
                data: [2.5, 2.9, 2.4, 2.9, 3.2, 3.4, null],
                color: "#8F0A06",
            },
            {
                name: "Salary",
                data: [2.9, 2, 2.7, 3.5, 3.3, 4.5, null],
                color: "#B1D6F9",
            },
            {
                name: "Company Culture",
                data: [2, 2.3, 2.5, 3, 4.5, 4.1, null],
                color: "#2774BC",
            },
            {
                name: "Job Role",
                data: [4.2, 3.2, 4.7, 2.6, 2.5, 3.1, null],
                color: "#FBD8D8",
            },
            {
                name: "Collegues",
                data: [3.6, 3.6, 2.9, 4.3, 4.3, 2.3, null],
                color: "#EF6461",
            },
        ],
        chart: {
            height: 200,
            type: "line",
            zoom: {
                enabled: false,
            },
        },
        legend: {
            show: true,
            position: "right",
            horizontalAlign: "center",
            offsetY: 0,
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "straight",
        },
        markers: {
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
            showNullDataPoints: true,
            hover: {
                size: undefined,
                sizeOffset: 3,
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
            options={options}
            series={options.series}
            type="line"
            height={chartHeight}
        />
    );
}
