import Chart from "react-apexcharts";

export default function ChartDonut() {
    const options = {
        chart: {
            height: 200,
            type: "donut",
        },
        dataLabels: {
            enabled: false,
        },
        series: [2.5, 1.5, 1],
        colors: ["#FBD8D8", "#F38886", "#0B4A86"],
        labels: ["Promoters (4 - 5)", "Neutrals (3)", "Detractors (1 - 2)"],
        legend: {
            show: true,
            markers: {
                width: 8,
                height: 8,
                radius: 12,
                offsetX: -8,
                offsetY: 0,
            },
            offsetY: 60,
        },
        plotOptions: {
            pie: {
                expandOnClick: false,
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                        },
                        value: {
                            show: true,
                            fontSize: "16px",
                            fontFamily: "Helvetica, Arial, sans-serif",
                            fontWeight: 400,
                            color: "#B5B5B5",
                            offsetY: 0,
                            formatter: function (val) {
                                return val;
                            },
                        },
                        total: {
                            show: true,
                            showAlways: true,
                            label: "4.5",
                            fontSize: "18px",
                            fontFamily: "Helvetica, Arial, sans-serif",
                            fontWeight: 400,
                            color: "#373d3f",
                        },
                    },
                },
            },
        },
    };

    return (
        <Chart
            options={options}
            series={options.series}
            type="donut"
            height={280}
        />
    );
}
