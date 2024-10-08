import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Divider } from "@mui/material";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import FilterButtons from "../../components/FilterButtons";
import TableWithProfile from "../../components/TableWithProfile";
import CardWithThreeStatus from "../../components/cards/CardWithThreeStatus";
import CardStacked from "../../components/cards/CardStacked";
import useAuthToken from "../../common/decodeToken";

import theme from "../../theme/theme";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const URL_CHARTS = `${process.env.REACT_APP_API_URL}/api/charts/recognitions`;

const RecognitionMain = () => {
    const { token, isTokenValid } = useAuthToken();
    const navigate = useNavigate();

    // let today = new Date().toISOString().split("T")[0];
    let today = "2024-07-31";
    const [chartsApi, setChartsApi] = useState({});
    const [chartIndex, setChartIndex] = useState(3);

    const handleFilterChange = (index) => {
        setChartIndex(index);
    };

    const [dataInd, setData] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [recognitions, setRecognitions] = useState([]); // for the table

    // Fetching charts recognitions
    useEffect(() => {
        const fetchCharts = async () => {
            if (!isTokenValid) {
                console.log("Token is invalid or has expired");
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
        fetchCharts();
    }, [token, isTokenValid, today]);

    useEffect(() => {
        function createRows(dataArray) {
            if (!Array.isArray(dataArray)) {
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
        const getRecognitions = async () => {
            if (!isTokenValid) {
                console.log("Token is invalid or has expired");
                navigate("/login");
                return;
            }

            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/recognition`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setData(data);
                } else {
                    console.error(
                        "Failed to fetch recognitions:",
                        response.statusText
                    );
                }
            } catch (error) {
                console.error("Error fetching recognitions:", error);
            }
        };

        getRecognitions();
    }, [isTokenValid, token, navigate]);

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
                    className="custom650:ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8 h-[calc(100vh-80px)]"
                >
                    <TopUserBar titleScreen={"Recognition"} />
                    <Breadcrumbs />
                    <FilterButtons
                        sx={{ marginTop: "8px" }}
                        filterEnabled={"Annual"}
                        onFilterChange={handleFilterChange}
                    />
                    <div className="grid min-[950px]:grid-cols-2 gap-4 mt-4">
                        <CardWithThreeStatus
                            title={"Recognition"}
                            totalNumber={
                                chartsApi.chart1
                                    ? chartsApi.chart1[chartIndex].info[0]
                                          .totalAmount
                                    : 0
                            }
                            chipPreviousNumberText={
                                chartsApi.chart1
                                    ? chartsApi.chart1[chartIndex].info[0]
                                          .badgeCount
                                    : 0
                            }
                            statusText1={"Pending"}
                            statusColor1={theme.palette.info.main}
                            number1={
                                chartsApi.chart1
                                    ? chartsApi.chart1[chartIndex].info[0]
                                          .statusCounts.pending
                                    : 0
                            }
                            chipText1={
                                chartsApi.chart1
                                    ? chartsApi.chart1[chartIndex].info[0]
                                          .statusCounts.pendingBadge
                                    : 0
                            }
                            statusText2={"Approved"}
                            statusColor2={theme.palette.success.main}
                            number2={
                                chartsApi.chart1
                                    ? chartsApi.chart1[chartIndex].info[0]
                                          .statusCounts.approved
                                    : 0
                            }
                            chipText2={
                                chartsApi.chart1
                                    ? chartsApi.chart1[chartIndex].info[0]
                                          .statusCounts.approvedBadge
                                    : 0
                            }
                            statusText3={"Rejected"}
                            statusColor3={theme.palette.error.main}
                            number3={
                                chartsApi.chart1
                                    ? chartsApi.chart1[chartIndex].info[0]
                                          .statusCounts.rejected
                                    : 0
                            }
                            chipText3={
                                chartsApi.chart1
                                    ? chartsApi.chart1[chartIndex].info[0]
                                          .statusCounts.rejectedBadge
                                    : 0
                            }
                            disabled={true}
                        />

                        <CardStacked
                            dataPrevious={
                                chartsApi.chart2
                                    ? chartsApi.chart2[chartIndex].info[0]
                                          .previous
                                    : []
                            }
                            dataCurrent={
                                chartsApi.chart2
                                    ? chartsApi.chart2[chartIndex].info[0]
                                          .current
                                    : []
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
            )}
        </>
    );
};

export default RecognitionMain;
