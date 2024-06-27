import React from "react";
import Chart from "react-apexcharts";
import styles from "./styles.module.css";

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
                name: "Series 1",
                data: [45, 52, 38, 45, 19, 23, 2],
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
        colors: ["silver", "blue"],
        xaxis: {
            categories: [
                "01 Jan",
                "02 Jan",
                "03 Jan",
                "04 Jan",
                "05 Jan",
                "06 Jan",
                "07 Jan",
            ],
        },
    };

    return (
        <div className={styles.fullWidth}>
            <p className={styles.title16}>Average Score Over Time</p>
            <Chart
                options={options}
                series={options.series}
                type="area"
                height={280}
            />
        </div>
    );
}
