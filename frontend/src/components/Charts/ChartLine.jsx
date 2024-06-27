import styles from "./styles.module.css";
import Chart from "react-apexcharts";

export default function ChartLine() {
    const options = {
        series: [
            {
                name: "Salary",
                data: [2.9, 2, 2.7, 3.5, 3.3, null],
            },
            {
                name: "Company Culture",
                data: [1, 2.3, 2.5, 3, 4.5, null],
            },
            {
                name: "Job Role",
                data: [4.2, 3.2, 4.7, 2.6, 2.5, null],
            },
            {
                name: "Collegues",
                data: [3.6, 3.6, 2.9, 4.3, 4.3, null],
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
            offsetY: 60,
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "straight",
        },
        xaxis: {
            categories: ["", "Jan/2024", "Feb/2024", "Mar/2024", "Apr/2024"],
            lines: {
                show: true,
            },
        },
        yaxis: {
            lines: {
                show: true,
            },
        },
    };
    return (
        <div className={styles.fullWidth}>
            <p className={styles.title16}>Overall Satisfaction Drivers</p>
            <Chart
                options={options}
                series={options.series}
                type="line"
                height={280}
            />
        </div>
    );
}
