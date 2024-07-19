import React, { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import FilterButtons from "../../components/FilterButtons";
import TableWithProfile from "../../components/TableWithProfile";
import CardWithThreeStatus from "../../components/cards/CardWithThreeStatus";
import CardStacked from "../../components/cards/CardStacked";
import theme from "../../theme/theme";

const URL_CHARTS = `${process.env.REACT_APP_API_URL}/api/charts/recognitions`;

const RecognitionMain = () => {
    // let today = new Date().toISOString().split("T")[0];
    let today = "2024-07-14";
    const [dataApi, setDataApi] = useState({});
    const [dataInd, setData] = useState("");

    const [recognitions, setRecognitions] = useState([]); // for the table

    // Fetching charts recognitions
    useEffect(() => {
        const fetchData = async () => {
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
                setDataApi(data);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };
        fetchData();
    }, [dataApi]);

    useEffect(() => {
        function createRows(dataArray) {
            if (!Array.isArray(dataArray)) {
                console.error("dataArray is not an array", dataArray);
                return [];
            }

            return dataArray.map((object) =>
                createData(
                    object.recognitionId,
                    {
                        profile: object.sender.profileImage,
                        nameSender: object.sender.name,
                        jobTitleSender: object.sender.jobTitle,
                    },
                    {
                        profile: object.receiver.profileImage,
                        nameReceiver: object.receiver.name,
                        jobTitleReceiver: object.receiver.jobTitle,
                    },
                    object.category,
                    object.dateRequest,
                    object.status
                )
            );
        }

        setRecognitions(createRows(dataInd));
    }, [dataInd]);

    // Array to map the table headings
    const columnsTable = [
        "id",
        "From",
        "To",
        "Category",
        "Requested Date",
        "Status",
    ];

    // Método para crear los datos necesarios para las filas de la tabla
    function createData(id, from, to, category, dateRequest, status) {
        return {
            id,
            from: {
                displayName: `${from.nameSender} (${from.jobTitleSender})`,
                profile: from.profile,
            },
            to: {
                displayName: `${to.nameReceiver} (${to.jobTitleReceiver})`,
                profile: to.profile,
            },
            category,
            dateRequest,
            status,
        };
    }
    // ====================================================
    useEffect(() => {
        const fetchSvg = async () => {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/recognition`
            );

            if (response.ok) {
                const data = await response.json();
                setData(data);
            }
        };

        fetchSvg();
    }, []);

    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8 h-full">
            <TopUserBar titleScreen={"Recognition"} />
            <Breadcrumbs />
            <FilterButtons sx={{ marginTop: "8px" }} />
            <div className="flex row gap-4 mt-4">
                <CardWithThreeStatus
                    title={"Recognition"}
                    totalNumber={
                        dataApi.chart1
                            ? dataApi.chart1[0].info[0].totalAmount
                            : 0
                    }
                    chipPreviousNumberText={
                        dataApi.chart1
                            ? dataApi.chart1[0].info[0].badgeCount
                            : 0
                    }
                    statusText1={"Pending"}
                    statusColor1={theme.palette.info.main}
                    number1={
                        dataApi.chart1
                            ? dataApi.chart1[0].info[0].statusCounts.pending
                            : 0
                    }
                    chipText1={
                        dataApi.chart1
                            ? dataApi.chart1[0].info[0].statusCounts
                                  .pendingBadge
                            : 0
                    }
                    statusText2={"Approved"}
                    statusColor2={theme.palette.success.main}
                    number2={
                        dataApi.chart1
                            ? dataApi.chart1[0].info[0].statusCounts.approved
                            : 0
                    }
                    chipText2={
                        dataApi.chart1
                            ? dataApi.chart1[0].info[0].statusCounts
                                  .approvedBadge
                            : 0
                    }
                    statusText3={"Rejected"}
                    statusColor3={theme.palette.error.main}
                    number3={
                        dataApi.chart1
                            ? dataApi.chart1[0].info[0].statusCounts.rejected
                            : 0
                    }
                    chipText3={
                        dataApi.chart1
                            ? dataApi.chart1[0].info[0].statusCounts
                                  .rejectedBadge
                            : 0
                    }
                    disabled={true}
                />

                <CardStacked
                    dataPrevious={
                        dataApi.chart2 ? dataApi.chart2[2].info[0].previous : []
                    }
                    dataCurrent={
                        dataApi.chart2 ? dataApi.chart2[2].info[0].current : []
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
                <TableWithProfile
                    title={"Request"}
                    pathRowTo={"/recognitions/requests"}
                    pathViewAllTo={"/recognitions/requests"}
                    tabsVariant={"variant2"}
                    rows={recognitions}
                    columns={columnsTable}
                    rowsNumber="5"
                    showSecondColumn={true}
                    showThirdLastColumn={true}
                    showSecondLastColumn={false}
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

export default RecognitionMain;
