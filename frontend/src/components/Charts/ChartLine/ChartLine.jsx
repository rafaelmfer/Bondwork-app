// //https://apexcharts.com/docs/chart-types/line-chart/
import React from "react";
import Chart from "react-apexcharts";
import styles from "./styles.module.css";
import { useContext } from "react";
import { createThemeContext } from "../../../context/Context";

const ChartLine = () => {
    const months = useContext(createThemeContext);

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
            //categories: months
            //categories: props.dates
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

    const series = [
        {
            name: "Series 1",
            data: [45, 52, 38, 45, 19, 23, 2],
        },
    ];

    return (
        <div className={styles.fullWidth}>
            <p className={styles.title16}>Overall Satisfaction Drivers</p>
            <Chart options={options} series={series} type="area" height={280} />
        </div>
    );
};

export default ChartLine;

// const meses = ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho'];
// <Chart dates={meses} />
