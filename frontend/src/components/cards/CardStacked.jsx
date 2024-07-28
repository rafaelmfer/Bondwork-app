import React from "react";
import Chart from "react-apexcharts";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { getChipColors, formatChipLabel } from "../chip/ChipNumber";
import theme from "../../theme/theme";

function ChartVerticalBar({
    className,
    chartHeight,
    dataPrevious,
    dataCurrent,
}) {
    const options = {
        series: [
            {
                name: "Previous",
                data: dataPrevious,
                color: theme.palette.primary.main,
            },
            {
                name: "Current",
                data: dataCurrent,
                color: theme.palette.info[300],
            },
        ],
        chart: {
            fontFamily: "IBM Plex Sans, sans-serif, ui-sans-serif, system-ui",
            type: "bar",
            height: 250,
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "45%",
                endingShape: "rounded",
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
        },
        xaxis: {
            categories: ["Performance", "Leadership", "Teamwork", "Creativity"],
            labels: {
                show: true,
                rotateAlways: false,
                hideOverlappingLabels: true,
                showDuplicates: false,
                trim: false,
                minHeight: undefined,
                maxHeight: 100,
                style: {
                    colors: "#0B0A0A",
                    fontSize: "12.6px",
                    fontFamily:
                        "IBM Plex Sans, sans-serif, ui-sans-serif, system-ui",
                    fontWeight: 600,
                    cssClass: "apexcharts-xaxis-label",
                },
            },
        },
        yaxis: {
            tickAmount: 4,
            title: {
                // text: "number",
            },
        },
        fill: {
            colors: ["#EF6461", "#11689E"],
        },
        legend: {
            show: true,
            position: "right",
            offsetY: 60,
            fontSize: "12px",
            fontFamily: "IBM Plex Sans, sans-serif, ui-sans-serif, system-ui",
            fontWeight: 500,
            markers: {
                width: 10,
                height: 10,
                radius: 12,
                offsetX: -4,
                offsetY: 0,
            },
        },
        tooltip: {
            // series: An array of arrays containing the values of all series in the chart.
            // seriesIndex: The index of the current series being processed.
            // dataPointIndex: The index of the current data point in the series.
            // w: An object that contains all the options and data for the chart.
            enabled: true,
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                const category = w.globals.labels[dataPointIndex];
                const prefix = seriesIndex === 0 ? "Previous" : "Current";
                const badgeNumber =
                    seriesIndex === 1
                        ? series[seriesIndex][dataPointIndex] -
                          series[seriesIndex - 1][dataPointIndex]
                        : 0;
                const { chipBackground, chipTextColor } =
                    getChipColors(badgeNumber);
                const showBadge =
                    seriesIndex === 1
                        ? `<div class="tooltip-extra" style="background-color: ${chipBackground};
                        color: ${chipTextColor};">${formatChipLabel(badgeNumber)}</div>`
                        : ``;
                return `<div class="custom-tooltip">
                            <div class="tooltip-header items-center">
                                <p class="tooltip-percentage"><span>${prefix}:</span> ${series[seriesIndex][dataPointIndex]}</p>
                                ${showBadge}
                            </div>
                            <div class="tooltip-label">${category}</div>
                        </div>`;
            },
        },
    };

    return (
        <>
            <style>
                {`
                    .apexcharts-tooltip.apexcharts-theme-light {
                        border-radius: 8px;
                        border: none;
                        background: rgba(30, 30, 30, .8);
                    }
                    
                    .custom-tooltip {
                        min-width: 170px;
                        background-color: rgba(5, 33, 60, 0.8);
                        color: #FFFFFF;
                        text-align: left;
                        border-radius: 8px;
                        padding: 16px;
                        position: relative;
                        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
                        font-family: 'IBM Plex Sans', sans-serif;
                    }

                    .tooltip-header {
                        display: flex;
                        flex-direction: row;
                        gap: 6px;
                    }

                    .tooltip-percentage {
                        font-size: 24px;
                        font-weight: 500;
                    }

                    .tooltip-percentage span {
                        font-size: 18px;
                        font-weight: 500;
                    }

                    .tooltip-extra {
                        border-radius: 12px;
                        padding: 2px 12px;
                        font-size: 16px;
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        justify-content: center;
                        height: 20px;
                    }

                    .tooltip-label {
                        font-size: 18px;
                        margin-top: 8px;
                    }
                `}
            </style>
            <Chart
                className={className}
                options={options}
                series={options.series}
                type="bar"
                height={chartHeight}
            />
        </>
    );
}

export default function CardStacked({ dataPrevious, dataCurrent }) {
    return (
        <Card
            variant="outlined"
            sx={{
                flexGrow: 1,
                flexBasis: 0,
                borderRadius: 4,
            }}
        >
            <CardContent sx={{ px: "24px", pt: "24px" }}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography
                        variant="h4"
                        color={theme.palette.neutrals.black}
                        fontWeight={600}
                    >
                        Recognition Drivers
                    </Typography>
                    <Typography
                        variant="small1"
                        color={theme.palette.neutrals.gray300}
                    >
                        Compared to Previous Period
                    </Typography>
                </Box>

                <ChartVerticalBar
                    chartHeight={200}
                    dataPrevious={dataPrevious}
                    dataCurrent={dataCurrent}
                />
            </CardContent>
        </Card>
    );
}
