import React from "react";
import Chart from "react-apexcharts";

export default function ChartArea() {
    const options = {
        chart: {
            height: 200,
            type: "area",
        },
        dataLabels: {
            enabled: false,
        },
        series: [
            {
                name: "Average",
                data: [3.7, 4.5, 4, 2.8, 3.4, 4.3, 4.1, null],
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
        colors: ["#F38886"],
        markers: {
            colors: ["#F38886"],
            size: 5,
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
        },
        yaxis: {
            min: 0,
            max: 5,
            tickAmount: 5,
        },
    };

    return (
        <Chart
            options={options}
            series={options.series}
            type="area"
            height={280}
        />
    );
}
