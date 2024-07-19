import React from "react";
import Chart from "react-apexcharts";
import {
    Box,
    Card,
    CardContent,
    Typography,
    //Chip,
    //Button,
} from "@mui/material";
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
                color: "#EF6461",
            },
            {
                name: "Current",
                data: dataCurrent,
                color: "#11689E",
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
                text: "number",
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
            enabled: false,
            y: {
                formatter: function (val) {
                    return "$ " + val + " thousandss";
                },
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
