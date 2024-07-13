import React, { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import CardWithTwoStatus from "../../components/cards/CardWithTwoStatus";
import CardWithThreeStatus from "../../components/cards/CardWithThreeStatus";
import TableSeven from "../../components/TableSeven";
import TableWithProfile from "../../components/TableWithProfile";
import theme from "../../theme/theme";

const URL = `${process.env.REACT_APP_API_URL}/api/rewards/`;

const RewardsMain = () => {
    const [rewards, setRewards] = useState([]);
    const [rows, setRows] = useState([]);
    const [rowsRequest, setRowsRequest] = useState([]);

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
    // Method to format the date in eg. Jul 01, 2024
    function formatDate(date) {
        const options = { month: "short", day: "2-digit", year: "numeric" };
        return date.toLocaleDateString("en-US", options);
    }
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
        status
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
                        redeemItem.status
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
            <div className="flex row gap-4 mt-4">
                <CardWithTwoStatus
                    title={"Management"}
                    totalNumber={98}
                    chipPreviousNumberText={6}
                    progressValue={70}
                    statusText1={"Ongoing"}
                    statusColor1={theme.palette.info.main}
                    number1={54}
                    chipText1={-10}
                    statusText2={"Upcoming"}
                    statusColor2={theme.palette.warning.main}
                    number2={44}
                    chipText2={16}
                />
                <CardWithThreeStatus
                    title={"Request"}
                    totalNumber={60}
                    chipPreviousNumberText={0}
                    progressValue1={50}
                    progressValue2={40}
                    progressValue3={10}
                    statusText1={"Pending"}
                    statusColor1={theme.palette.info.main}
                    number1={40}
                    chipText1={-20}
                    statusText2={"Approved"}
                    statusColor2={theme.palette.success.main}
                    number2={18}
                    chipText2={18}
                    statusText3={"Rejected"}
                    statusColor3={theme.palette.error.main}
                    number3={2}
                    chipText3={2}
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
                />
            </div>
        </main>
    );
};

export default RewardsMain;
