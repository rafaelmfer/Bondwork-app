import React, { useState, useEffect } from "react";
import TopUserBar from "../components/top-user-bar/TopUserBar";
import CardWithThreeStatus from "../components/cards/CardWithThreeStatus";
import CardTurnoverRate from "../components/cards/CardTurnoverRate";
import CardSatisfactionDrivers from "../components/cards/CardSatisfactionDrivers";
import Breadcrumbs from "../components/Breadcrumbs";
import theme from "../theme/theme";

const URL = `${process.env.REACT_APP_API_URL}/api/charts/dashboard`;

const Home = () => {
    const [dataApi, setDataApi] = useState({});

    // Fetching charts dashboard
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ date: "2024-07-14" }),
                });
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const data = await res.json();
                setDataApi(data);
                console.log(data);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };
        fetchData();
    }, [dataApi]);

    const currentTurnOverRate = 10.0;
    const badgeTurnOver = 0.2;
    const chartData = {
        categories: ["19", "20", "21", "22", "23", "24", "25"],
        series: [9, 6, 12, 17.5, 15, 7.5, 10],
    };

    const chartDataSatisfaction = [
        {
            name: "Overall",
            data: [2.5, 2.9, 2.4, 2.9, 3.2, 3.4, null],
            color: "#8F0A06",
        },
        {
            name: "Salary",
            data: [2.9, 2, 2.7, 3.5, 3.3, 4.5, null],
            color: "#B1D6F9",
        },
        {
            name: "Company Culture",
            data: [2, 2.3, 2.5, 3, 4.5, 4.1, null],
            color: "#2774BC",
        },
        {
            name: "Job Role",
            data: [4.2, 3.2, 4.7, 2.6, 2.5, 3.1, null],
            color: "#FBD8D8",
        },
        {
            name: "Collegues",
            data: [3.6, 3.6, 2.9, 4.3, 4.3, 2.3, null],
            color: "#EF6461",
        },
    ];

    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8 h-[calc(100vh-80px)]">
            <TopUserBar titleScreen={"Dashboard"} backIcon={false} />
            <Breadcrumbs />
            <div className="flex row gap-4 mt-6">
                <CardTurnoverRate
                    title={"Turnover Rate"}
                    currentRate={currentTurnOverRate}
                    badge={badgeTurnOver}
                    chartData={chartData}
                />
                <CardSatisfactionDrivers
                    overall={3.25}
                    chipText={-0.2}
                    data={chartDataSatisfaction}
                />
            </div>
            <div className="flex row gap-4 mt-6">
                <CardWithThreeStatus
                    title={"Recognition"}
                    totalNumber={
                        dataApi.chart3
                            ? dataApi.chart3[0].info[0].totalAmount
                            : 0
                    }
                    chipPreviousNumberText={
                        dataApi.chart3
                            ? dataApi.chart3[0].info[0].badgeCount
                            : 0
                    }
                    statusText1={"Pending"}
                    statusColor1={theme.palette.info.main}
                    number1={
                        dataApi.chart3
                            ? dataApi.chart3[0].info[0].statusCounts.pending
                            : 0
                    }
                    chipText1={
                        dataApi.chart3
                            ? dataApi.chart3[0].info[0].statusCounts
                                  .pendingBadge
                            : 0
                    }
                    statusText2={"Approved"}
                    statusColor2={theme.palette.success.main}
                    number2={
                        dataApi.chart3
                            ? dataApi.chart3[0].info[0].statusCounts.approved
                            : 0
                    }
                    chipText2={
                        dataApi.chart3
                            ? dataApi.chart3[0].info[0].statusCounts
                                  .approvedBadge
                            : 0
                    }
                    statusText3={"Rejected"}
                    statusColor3={theme.palette.error.main}
                    number3={
                        dataApi.chart3
                            ? dataApi.chart3[0].info[0].statusCounts.rejected
                            : 0
                    }
                    chipText3={
                        dataApi.chart3
                            ? dataApi.chart3[0].info[0].statusCounts
                                  .rejectedBadge
                            : 0
                    }
                    pathButton={"/recognitions"}
                />
                <CardWithThreeStatus
                    title={"Rewards Request"}
                    totalNumber={
                        dataApi.chart4
                            ? dataApi.chart4[0].info[0].totalAmount
                            : 0
                    }
                    chipPreviousNumberText={
                        dataApi.chart4
                            ? dataApi.chart4[0].info[0].badgeCount
                            : 0
                    }
                    statusText1={"Pending"}
                    statusColor1={theme.palette.info.main}
                    number1={
                        dataApi.chart4
                            ? dataApi.chart4[0].info[0].statusCounts.pending
                            : 0
                    }
                    chipText1={
                        dataApi.chart4
                            ? dataApi.chart4[0].info[0].statusCounts
                                  .pendingBadge
                            : 0
                    }
                    statusText2={"Approved"}
                    statusColor2={theme.palette.success.main}
                    number2={
                        dataApi.chart4
                            ? dataApi.chart4[0].info[0].statusCounts.approved
                            : 0
                    }
                    chipText2={
                        dataApi.chart4
                            ? dataApi.chart4[0].info[0].statusCounts
                                  .approvedBadge
                            : 0
                    }
                    statusText3={"Rejected"}
                    statusColor3={theme.palette.error.main}
                    number3={
                        dataApi.chart4
                            ? dataApi.chart4[0].info[0].statusCounts.rejected
                            : 0
                    }
                    chipText3={
                        dataApi.chart4
                            ? dataApi.chart4[0].info[0].statusCounts
                                  .rejectedBadge
                            : 0
                    }
                    pathButton={"/rewards"}
                />
            </div>
        </main>
    );
};

export default Home;
