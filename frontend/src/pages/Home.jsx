import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopUserBar from "../components/top-user-bar/TopUserBar";
import CardWithThreeStatus from "../components/cards/CardWithThreeStatus";
import CardTurnoverRate from "../components/cards/CardTurnoverRate";
import CardSatisfactionDrivers from "../components/cards/CardSatisfactionDrivers";
import Breadcrumbs from "../components/Breadcrumbs";
import theme from "../theme/theme";
import FilterButtons from "../components/FilterButtons";
import useAuthToken from "../common/decodeToken";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "../fadein.css";

const URL_CHARTS = `${process.env.REACT_APP_API_URL}/api/charts/dashboard`;

const Home = () => {
    const { token, isTokenValid } = useAuthToken();
    const navigate = useNavigate();

    let today = "2024-07-31";

    const [isLoading, setIsLoading] = useState(true);
    const [chartsApi, setChartsApi] = useState({});
    const [chartIndex, setChartIndex] = useState(3);

    const handleFilterChange = (index) => {
        setChartIndex(index);
    };

    // Fetching charts dashboard
    useEffect(() => {
        const fetchData = async () => {
            //handle the scenario where the token might expire during an active session.
            if (!isTokenValid) {
                console.log("Token is invalid or has expired");
                navigate("/login"); // Back to login screen
                return;
            }
            try {
                const res = await fetch(URL_CHARTS, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ date: today }),
                });
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const data = await res.json();
                setChartsApi(data);
                setIsLoading(false);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };
        fetchData();
    }, [token, isTokenValid, navigate, today]);

    const currentTurnOverRate = chartsApi.chart1
        ? chartsApi.chart1[chartIndex].info[0].current
        : 0;
    const badgeTurnOver = chartsApi.chart1
        ? chartsApi.chart1[chartIndex].info[0].currentBadge
        : 0;
    const chartData = {
        categories: chartsApi.chart1
            ? chartsApi.chart1[chartIndex].info[0].labels
            : [],
        series: chartsApi.chart1
            ? chartsApi.chart1[chartIndex].info[0].value
            : [],
    };

    const chartDataSatisfaction = [
        {
            name: "Overall",
            data: chartsApi.chart2
                ? chartsApi.chart2[chartIndex].info.averages[0]
                : [0],
            color: "#8F0A06",
        },
        {
            name: "Salary",
            data: chartsApi.chart2
                ? chartsApi.chart2[chartIndex].info.averages[1]
                : [0],
            color: "#B1D6F9",
        },
        {
            name: "Company Culture",
            data: chartsApi.chart2
                ? chartsApi.chart2[chartIndex].info.averages[2]
                : [0],
            color: "#2774BC",
        },
        {
            name: "Job Role",
            data: chartsApi.chart2
                ? chartsApi.chart2[chartIndex].info.averages[3]
                : [0],
            color: "#FBD8D8",
        },
        {
            name: "Colleagues",
            data: chartsApi.chart2
                ? chartsApi.chart2[chartIndex].info.averages[4]
                : [0],
            color: "#EF6461",
        },
    ];

    return (
        <>
            {isLoading ? (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",

                        height: "100vh", // Ensures it takes full height of the viewport
                    }}
                >
                    <Box sx={{ position: "relative" }}>
                        <CircularProgress size={120} />

                        <p
                            style={{
                                position: "absolute",
                                top: "40%",
                                left: 0,
                                right: 0,
                                textAlign: "center",
                            }}
                        >
                            Loading
                        </p>
                    </Box>
                </Box>
            ) : (
                <main
                    style={{ animation: "fadeIn 1.5s" }}
                    className="custom650:ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8 min-h-[calc(100vh-80px)]"
                >
                    <TopUserBar titleScreen={"Dashboard"} backIcon={false} />
                    <Breadcrumbs />
                    <FilterButtons
                        sx={{ marginTop: "8px" }}
                        filterEnabled={"Annual"}
                        onFilterChange={handleFilterChange}
                    />
                    <div className="grid min-[950px]:grid-cols-2 gap-4 mt-4">
                        <CardTurnoverRate
                            title={"Turnover Rate"}
                            currentRate={currentTurnOverRate}
                            badge={badgeTurnOver}
                            chartData={chartData}
                        />
                        <CardSatisfactionDrivers
                            overall={
                                chartsApi.chart2
                                    ? chartsApi.chart2[chartIndex].info
                                          .currentOverall
                                    : 0
                            }
                            chipText={
                                chartsApi.chart2
                                    ? chartsApi.chart2[chartIndex].info
                                          .lastOverall
                                    : 0
                            }
                            data={chartDataSatisfaction}
                            labels={
                                chartsApi.chart2
                                    ? chartsApi.chart2[chartIndex].info.labels
                                    : []
                            }
                        />
                    </div>
                    <div className="grid min-[950px]:grid-cols-2 gap-4 mt-6 mb-8">
                        <CardWithThreeStatus
                            title={"Recognition Request"}
                            totalNumber={
                                chartsApi.chart3
                                    ? chartsApi.chart3[chartIndex].info[0]
                                          .totalAmount
                                    : 0
                            }
                            chipPreviousNumberText={
                                chartsApi.chart3
                                    ? chartsApi.chart3[chartIndex].info[0]
                                          .badgeCount
                                    : 0
                            }
                            statusText1={"Pending"}
                            statusColor1={theme.palette.info.main}
                            number1={
                                chartsApi.chart3
                                    ? chartsApi.chart3[chartIndex].info[0]
                                          .statusCounts.pending
                                    : 0
                            }
                            chipText1={
                                chartsApi.chart3
                                    ? chartsApi.chart3[chartIndex].info[0]
                                          .statusCounts.pendingBadge
                                    : 0
                            }
                            statusText2={"Approved"}
                            statusColor2={theme.palette.success.main}
                            number2={
                                chartsApi.chart3
                                    ? chartsApi.chart3[chartIndex].info[0]
                                          .statusCounts.approved
                                    : 0
                            }
                            chipText2={
                                chartsApi.chart3
                                    ? chartsApi.chart3[chartIndex].info[0]
                                          .statusCounts.approvedBadge
                                    : 0
                            }
                            statusText3={"Rejected"}
                            statusColor3={theme.palette.error.main}
                            number3={
                                chartsApi.chart3
                                    ? chartsApi.chart3[chartIndex].info[0]
                                          .statusCounts.rejected
                                    : 0
                            }
                            chipText3={
                                chartsApi.chart3
                                    ? chartsApi.chart3[chartIndex].info[0]
                                          .statusCounts.rejectedBadge
                                    : 0
                            }
                            pathButton={"/recognitions/requests"}
                        />
                        <CardWithThreeStatus
                            title={"Rewards Request"}
                            totalNumber={
                                chartsApi.chart4
                                    ? chartsApi.chart4[chartIndex].info[0]
                                          .totalAmount
                                    : 0
                            }
                            chipPreviousNumberText={
                                chartsApi.chart4
                                    ? chartsApi.chart4[chartIndex].info[0]
                                          .badgeCount
                                    : 0
                            }
                            statusText1={"Pending"}
                            statusColor1={theme.palette.info.main}
                            number1={
                                chartsApi.chart4
                                    ? chartsApi.chart4[chartIndex].info[0]
                                          .statusCounts.pending
                                    : 0
                            }
                            chipText1={
                                chartsApi.chart4
                                    ? chartsApi.chart4[chartIndex].info[0]
                                          .statusCounts.pendingBadge
                                    : 0
                            }
                            statusText2={"Approved"}
                            statusColor2={theme.palette.success.main}
                            number2={
                                chartsApi.chart4
                                    ? chartsApi.chart4[chartIndex].info[0]
                                          .statusCounts.approved
                                    : 0
                            }
                            chipText2={
                                chartsApi.chart4
                                    ? chartsApi.chart4[chartIndex].info[0]
                                          .statusCounts.approvedBadge
                                    : 0
                            }
                            statusText3={"Rejected"}
                            statusColor3={theme.palette.error.main}
                            number3={
                                chartsApi.chart4
                                    ? chartsApi.chart4[chartIndex].info[0]
                                          .statusCounts.rejected
                                    : 0
                            }
                            chipText3={
                                chartsApi.chart4
                                    ? chartsApi.chart4[chartIndex].info[0]
                                          .statusCounts.rejectedBadge
                                    : 0
                            }
                            pathButton={"/rewards/requests"}
                        />
                    </div>
                </main>
            )}
        </>
    );
};

export default Home;
