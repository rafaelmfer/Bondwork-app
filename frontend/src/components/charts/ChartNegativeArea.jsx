import Chart from "react-apexcharts";

const ChartNegativeArea = ({ data }) => {
    const referenceValue = 10;

    const adjustedData = data.series.map((value, index) => ({
        x: data.categories[index],
        y: value - referenceValue,
    }));

    const positiveSeries = adjustedData.map((item) => ({
        x: item.x,
        y: Math.min(item.y, 0),
    }));

    const negativeSeries = adjustedData.map((item) => ({
        x: item.x,
        y: Math.max(item.y, 0),
    }));

    const chartOptions = {
        chart: {
            type: "area",
            height: "100%",
        },
        stroke: {
            curve: "smooth",
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.3,
                opacityTo: 0.9,
            },
        },
        dataLabels: {
            enabled: false,
        },
        series: [
            {
                name: "Turnover Rate",
                data: adjustedData,
                color: "#CA310F",
            },
            //   {
            //     name: "Positive Series",
            //     data: positiveSeries,
            //     color: "#CA310F",
            //   },
            //   {
            //     name: "Negative Series",
            //     data: negativeSeries,
            //     color: "#30BC3E",
            //   },
        ],
        legend: {
            show: false,
            position: "top",
            horizontalAlign: "right",
            fontSize: "14px",
            fontFamily: "Inter",
            fontWeight: 400,
            offsetY: -16,
            labels: {
                colors: "#8e8da4",
            },
        },
        xaxis: {
            categories: data.categories,
        },
        yaxis: {
            min: -referenceValue,
            max: 20,
            tickAmount: 6,
            labels: {
                formatter: (value) => value + referenceValue,
                style: {
                    colors: "#8e8da4",
                },
                offsetY: 0,
                offsetX: 0,
            },
        },
        tooltip: {
            y: {
                formatter: (value) => `${value + referenceValue}%`,
            },
        },
    };

    return (
        <Chart
            options={chartOptions}
            series={chartOptions.series}
            type="area"
        />
    );
};

export default ChartNegativeArea;
