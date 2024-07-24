import React, { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import FilterButtons from "../../components/FilterButtons";
import CardWithTwoStatus from "../../components/cards/CardWithTwoStatus";
import CardWithThreeStatus from "../../components/cards/CardWithThreeStatus";
import TableSeven from "../../components/TableSeven";
import TableWithProfile from "../../components/TableWithProfile";
import theme from "../../theme/theme";

const URL = `${process.env.REACT_APP_API_URL}/api/rewards/`;
const URL_CHARTS = `${process.env.REACT_APP_API_URL}/api/charts/rewards`;

const RewardsMain = () => {
    // let today = new Date().toISOString().split("T")[0];
    let today = "2024-07-14";

    const [chartsApi, setChartsApi] = useState({});
    const [rewards, setRewards] = useState([]);
    const [rows, setRows] = useState([]);
    const [rowsRequest, setRowsRequest] = useState([]);
    const [chartIndex, setChartIndex] = useState(0);

    const handleFilterChange = (index) => {
        setChartIndex(index);
    };

    // Fetching charts rewards
    useEffect(() => {
        const fetchCharts = async () => {
            try {
                const res = await fetch(URL_CHARTS, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ date: today }),
                });
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const data = await res.json();
                setChartsApi(data);
                console.log(data);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };
        fetchCharts();
    }, []);

    // Fetching Rewards
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(URL);
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const data = await res.json();
                setRewards(data);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };
        fetchData();
    }, []);

    // MANAGEMENT TABLE -------------------------------------
    // Array to map the table headings for Management Table
    const columnsTable = [
        "id",
        "Title",
        "Category",
        "Points",
        "Finish Date",
        "Redeem",
        "Status",
    ];

    // method with the columns needed for the table
    function createData(id, title, category, points, endDate, redeem, status) {
        return {
            id,
            title,
            category,
            points,
            endDate,
            redeem,
            status,
        };
    }

    useEffect(() => {
        // method to structure the data into the fields that we need
        function createRows(dataArray) {
            return dataArray.map((object) => {
                // Filter to get only the number of "Approved" rewards redeemed
                const approvedRedeems = object.redeem.filter(
                    (redeemItem) => redeemItem.status === "Approved"
                );

                return createData(
                    object.rewardId,
                    object.title,
                    object.category,
                    object.pointsCost,
                    object.endDate,
                    approvedRedeems.length,
                    object.status
                );
            });
        }
        // create the array that will be passed into the table
        setRows(createRows(rewards));
    }, [rewards]);

    // REQUEST TABLE -------------------------------------
    const columnsTableRequest = [
        "id",
        "From",
        "Title",
        "Category",
        "Points",
        "Requested Date",
        "Status",
    ];
    function createDataRequest(
        id,
        from,
        title,
        category,
        points,
        dateRequest,
        status,
        rewardId
    ) {
        return {
            id,
            from: {
                displayName: `${from.nameSender} (${from.jobTitleSender})`,
                profile: from.profile,
            },
            title,
            category,
            points,
            dateRequest,
            status,
            rewardId,
        };
    }

    useEffect(() => {
        // method to structure the data into the fields that we need
        function createRowsRequest(dataArray) {
            // use of flatMap instead of map
            return dataArray.flatMap((object) => {
                // Iterar sobre cada elemento en el array redeem
                return object.redeem.map((redeemItem) =>
                    createDataRequest(
                        redeemItem.id,
                        {
                            profile: redeemItem.profilePicture,
                            nameSender: redeemItem.fullName,
                            jobTitleSender: redeemItem.jobTitle,
                        },
                        object.title,
                        object.category,
                        object.pointsCost,

                        redeemItem.requestDate,
                        redeemItem.status,
                        object.rewardId
                    )
                );
            });
        }
        // create the array that will be passed into the table
        setRowsRequest(createRowsRequest(rewards));
    }, [rewards]);

    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8 h-[calc(100vh-80px)]">
            <TopUserBar titleScreen={"Rewards"} />
            <Breadcrumbs />
            <FilterButtons
                sx={{ marginTop: "8px" }}
                filterEnabled={"Week"}
                onFilterChange={handleFilterChange}
            />
            <div className="flex row gap-4 mt-4">
                <CardWithTwoStatus
                    title={"Management"}
                    totalNumber={
                        chartsApi.chart1
                            ? chartsApi.chart1[chartIndex].info[0].totalAmount
                            : 0
                    }
                    chipPreviousNumberText={
                        chartsApi.chart1
                            ? chartsApi.chart1[chartIndex].info[0].badgeCount
                            : 0
                    }
                    statusText1={"Ongoing"}
                    statusColor1={theme.palette.info.main}
                    number1={
                        chartsApi.chart1
                            ? chartsApi.chart1[chartIndex].info[0].statusCounts
                                  .ongoing
                            : 0
                    }
                    chipText1={
                        chartsApi.chart1
                            ? chartsApi.chart1[chartIndex].info[0].statusCounts
                                  .ongoingBadge
                            : 0
                    }
                    statusText2={"Upcoming"}
                    statusColor2={theme.palette.warning.main}
                    number2={
                        chartsApi.chart1
                            ? chartsApi.chart1[chartIndex].info[0].statusCounts
                                  .upcoming
                            : 0
                    }
                    chipText2={
                        chartsApi.chart1
                            ? chartsApi.chart1[chartIndex].info[0].statusCounts
                                  .upcomingBadge
                            : 0
                    }
                />
                <CardWithThreeStatus
                    title={"Request"}
                    totalNumber={
                        chartsApi.chart2
                            ? chartsApi.chart2[chartIndex].info[0].totalAmount
                            : 0
                    }
                    chipPreviousNumberText={
                        chartsApi.chart2
                            ? chartsApi.chart2[chartIndex].info[0].badgeCount
                            : 0
                    }
                    statusText1={"Pending"}
                    statusColor1={theme.palette.info.main}
                    number1={
                        chartsApi.chart2
                            ? chartsApi.chart2[chartIndex].info[0].statusCounts
                                  .pending
                            : 0
                    }
                    chipText1={
                        chartsApi.chart2
                            ? chartsApi.chart2[chartIndex].info[0].statusCounts
                                  .pendingBadge
                            : 0
                    }
                    statusText2={"Approved"}
                    statusColor2={theme.palette.success.main}
                    number2={
                        chartsApi.chart2
                            ? chartsApi.chart2[chartIndex].info[0].statusCounts
                                  .approved
                            : 0
                    }
                    chipText2={
                        chartsApi.chart2
                            ? chartsApi.chart2[chartIndex].info[0].statusCounts
                                  .approvedBadge
                            : 0
                    }
                    statusText3={"Rejected"}
                    statusColor3={theme.palette.error.main}
                    number3={
                        chartsApi.chart2
                            ? chartsApi.chart2[chartIndex].info[0].statusCounts
                                  .rejected
                            : 0
                    }
                    chipText3={
                        chartsApi.chart2
                            ? chartsApi.chart2[chartIndex].info[0].statusCounts
                                  .rejectedBadge
                            : 0
                    }
                />
            </div>

            <Divider
                sx={{
                    background: theme.palette.neutrals.divider,
                    marginTop: "32px",
                }}
            />

            <div className="flex flex-col gap-4 mx-[-16px] mt-4">
                <TableSeven
                    title={"Management"}
                    pathViewAllTo={"/rewards/management"}
                    pathAddTo={"/rewards/management/addReward"}
                    pathRowTo={"/rewards/management"}
                    rows={rows}
                    columns={columnsTable}
                    rowsNumber="5"
                    showLastColumn={false}
                    showSearch={false}
                    showCheckboxColumn={false}
                    showBtnColumn={false}
                    showPagination={false}
                />
            </div>

            <div className="flex flex-col gap-4 mx-[-16px] mt-[24px]">
                <TableWithProfile
                    title={"Request"}
                    pathRowTo={"/rewards/requests"}
                    pathViewAllTo={"/rewards/requests"}
                    tabsVariant={"variant2"}
                    rows={rowsRequest}
                    columns={columnsTableRequest}
                    rowsNumber="5"
                    showSecondColumn={false}
                    showThirdLastColumn={true}
                    showSecondLastColumn={true}
                    showLastColumn={true}
                    showSearch={false}
                    showAdd={false}
                    showCheckboxColumn={false}
                    showBtnColumn={false}
                    showPagination={false}
                    pathCompound={true}
                />
            </div>
        </main>
    );
};

export default RewardsMain;
