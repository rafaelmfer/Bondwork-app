// //https://apexcharts.com/docs/chart-types/line-chart/
import React from "react";
import Chart from "react-apexcharts";
import ChartLine from "./ChartLine/ChartLine";
import AverScore from "./AverScore/AverScore";
import Satisfaction from "./Satisfaction/Satisfaction";
import styles from "./styles.module.css";

const ChartComponent = () => {
    return (
        <div className={styles.chart} id="chart">
            <AverScore />
            <Satisfaction />
            <ChartLine />
        </div>
    );
};

export default ChartComponent;
