import React from "react";
import Chart from "react-apexcharts";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
    Button,
} from "@mui/material";

function ChartVerticalBar({ className, chartHeight }) {
    const options = {
        series: [
            {
                name: "Net Profit",
                data: [44, 55, 57, 56],
            },
            {
                name: "Revenue",
                data: [76, 85, 92, 88],
            },
        ],
        chart: {
            type: "bar",
            height: 350,
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "30%",
                endingShape: "rounded",
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 10,
            colors: ["transparent"],
        },
        xaxis: {
            categories: [
                `Great Performance`,
                "Leadership",
                "Teamwork",
                "Innovative Idea",
            ],
            labels: {
                show: true,
                rotate: -45,
                rotateAlways: false,
                hideOverlappingLabels: true,
                showDuplicates: false,
                trim: false,
                minHeight: undefined,
                maxHeight: 100,

                style: {
                    colors: ["red", "blue", "green", "purple"],
                    fontSize: "12px",
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: 400,
                    cssClass: "apexcharts-xaxis-label",
                },
            },
        },

        yaxis: {
            tickAmount: 5,
            title: {
                text: "",
            },
        },
        fill: {
            colors: ["#EF6461", "#0E5886"],
        },
        legend: {
            show: false,
        },
        tooltip: {
            enabled: false,
            y: {
                formatter: function (val) {
                    return "$ " + val + " thousandss";
                },
            },
        },
        grid: {
            padding: {
                left: 30, // or whatever value that works
                right: 30, // or whatever value that works
            },
        },
    };

    return (
        <Chart
            className={className}
            options={options}
            series={options.series}
            type="bar"
            height={chartHeight}
        />
    );
}

export function CardStacked() {
    return (
        <Card
            variant="outlined"
            sx={{
                px: 2,
                pt: 2,
                mb: 2,
                pb: 0,
                flexGrow: 1,
                flexBasis: 0,
                borderRadius: 4,
            }}
        >
            <CardContent
                sx={{
                    "&:last-child": {
                        paddingBottom: 0,
                    },
                }}
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Button
                        sx={{
                            textTransform: "none",
                            color: "inherit",
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            padding: 0,
                            "&:hover": {
                                backgroundColor: "transparent",
                            },
                        }}
                    >
                        Category Trend Movement
                    </Button>
                    <Typography variant="p" color="textSecondary">
                        Compared to last week
                    </Typography>
                </Box>

                <ChartVerticalBar chartHeight={250} />
                {/* <div class="relative h-[25px]">
                  <ul class="flex justify-between absolute w-full -top-[30px] pl-[10%] text-[15px]">
                      <li>Great Performance</li>
                      <li>Leadership</li>
                      <li>Teamwork</li>
                      <li>Innovative Idea</li>
                  </ul>
                </div> */}
            </CardContent>
        </Card>
    );
}
