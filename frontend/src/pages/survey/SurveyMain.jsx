import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Divider } from "@mui/material";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import FilterButtons from "../../components/FilterButtons";
import CardWithTwoStatus from "../../components/cards/CardWithTwoStatus";
import ChartArea from "../../components/charts/ChartArea";
import ChartDonut from "../../components/charts/ChartDonut";
import ChartLine from "../../components/charts/ChartLine";
import TableSeven from "../../components/TableSeven";
import useAuthToken from "../../common/decodeToken";
import theme from "../../theme/theme";
import CircularProgress from "@mui/material/CircularProgress";

const URL = `${process.env.REACT_APP_API_URL}/api/surveys`;
const URL_CHARTS = `${process.env.REACT_APP_API_URL}/api/charts/surveys`;

const SurveyMain = () => {
    const { token, isTokenValid } = useAuthToken();
    const navigate = useNavigate();
    // let today = new Date().toISOString().split("T")[0];
    let today = "2024-08-03";
    const [chartsApi, setChartsApi] = useState({});
    const [chartIndex, setChartIndex] = useState(3);
    const [isLoading, setIsLoading] = useState(true);

    const handleFilterChange = (index) => {
        setChartIndex(index);
    };

    // Fetching charts rewards
    useEffect(() => {
        const fetchCharts = async () => {
            try {
                if (!isTokenValid) {
                    console.log("Token is invalid or has expired");
                    navigate("/login");
                    return;
                }
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
                console.log(data);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };
        fetchCharts();
    }, [isTokenValid, token, navigate, today]);

    const [surveys, setSurveys] = useState([]);
    // Fetching surveys
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(URL, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const data = await res.json();
                setSurveys(data);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };
        fetchData();
    }, [token]);

    // Array to map the table headings
    const columnsTable = [
        "id",
        "Survey Name",
        "Created In",
        "Expired Date",
        "Completed",
        "Sent",
        "Status",
    ];

    // method with the columns needed for the table
    function createData(
        id,
        surveyName,
        createdIn,
        expired,
        completed,
        viewed,
        status
    ) {
        return {
            id,
            surveyName,
            createdIn,
            expired,
            completed,
            viewed,
            status,
        };
    }
    // method to structure the data into the fields that we need
    function createRows(dataArray) {
        return dataArray.map((object) =>
            createData(
                object.surveyId,
                object.name,
                object.startDate,
                object.endDate,
                object.completed?.length || 0,
                object.sent?.length || 0,
                object.status
            )
        );
    }
    // create the array that will be passed into the table
    const rows = createRows(surveys);

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
                    className="custom650:ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8 min-h-[130vh]"
                >
                    <TopUserBar titleScreen={"Surveys"} />
                    <Breadcrumbs />
                    <FilterButtons
                        sx={{ marginTop: "8px" }}
                        filterEnabled={"Annual"}
                        onFilterChange={handleFilterChange}
                    />
                    <Box className="h-full grid min-[950px]:grid-cols-2 items-center gap-6 mt-4">
                        <CardWithTwoStatus
                            title={"Management"}
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
                            statusText1={"Ongoing"}
                            statusColor1={theme.palette.info.main}
                            number1={
                                chartsApi.chart1
                                    ? chartsApi.chart1[chartIndex].info[0]
                                          .statusCounts.ongoing
                                    : 0
                            }
                            chipText1={
                                chartsApi.chart1
                                    ? chartsApi.chart1[chartIndex].info[0]
                                          .statusCounts.ongoingBadge
                                    : 0
                            }
                            statusText2={"Upcoming"}
                            statusColor2={theme.palette.warning.main}
                            number2={
                                chartsApi.chart1
                                    ? chartsApi.chart1[chartIndex].info[0]
                                          .statusCounts.upcoming
                                    : 0
                            }
                            chipText2={
                                chartsApi.chart1
                                    ? chartsApi.chart1[chartIndex].info[0]
                                          .statusCounts.upcomingBadge
                                    : 0
                            }
                        />

                        <div className="chart-donut-card bg-main-50 flex flex-col h-full shadow-[0px_0px_6px_2px_rgba(0,0,0,0.06)] p-4 rounded-lg">
                            <h4 className="text-h4 text-neutrals-black mb-2">
                                Employee Satisfaction Index
                            </h4>
                            <ChartDonut
                                className="chart-donut-survey-main flex flex-col justify-center h-full"
                                chartHeight={200}
                                data={
                                    chartsApi.chart2
                                        ? chartsApi.chart2[chartIndex].info[0]
                                              .percentages
                                        : [1, 1, 1]
                                }
                                totalAverage={
                                    chartsApi.chart2
                                        ? chartsApi.chart2[chartIndex].info[0]
                                              .totalAverage
                                        : "0"
                                }
                            />
                        </div>
                    </Box>

                    <div
                        className="h-full grid min-[950px]:grid-cols-2 items-center gap-6 mt-6"
                        id="chart"
                    >
                        <div className="chart-area-card h-full bg-main-50 shadow-[0px_0px_6px_2px_rgba(0,0,0,0.06)] p-4 rounded-lg">
                            <h4 className="text-h4 text-neutrals-black mb-2">
                                Average Score Over Time
                            </h4>
                            <ChartArea
                                className="chart-area-survey-main"
                                chartHeight={220}
                                chartData={
                                    chartsApi.chart3
                                        ? chartsApi.chart3[chartIndex].info[0]
                                              .averages
                                        : [null, null, null, null, null]
                                }
                                labels={
                                    chartsApi.chart3
                                        ? chartsApi.chart3[chartIndex].info[0]
                                              .labels
                                        : []
                                }
                            />
                        </div>

                        <div className="chart-line-card h-full bg-main-50 shadow-[0px_0px_6px_2px_rgba(0,0,0,0.06)] p-4 rounded-lg">
                            <h4 className="text-h4 text-neutrals-black mb-2">
                                Overall Satisfaction Drivers
                            </h4>
                            <ChartLine
                                className="chart-line-survey-main"
                                chartHeight={220}
                                data={
                                    chartsApi.chart4
                                        ? [
                                              {
                                                  name: "Salary",
                                                  data: chartsApi.chart4
                                                      ? chartsApi.chart4[
                                                            chartIndex
                                                        ].info.averages[0]
                                                      : [null, 3.3],
                                                  color: "#B1D6F9",
                                              },
                                              {
                                                  name: "Company Culture",
                                                  data: chartsApi.chart4
                                                      ? chartsApi.chart4[
                                                            chartIndex
                                                        ].info.averages[1]
                                                      : [0],
                                                  color: "#2774BC",
                                              },
                                              {
                                                  name: "Job Role",
                                                  data: chartsApi.chart4
                                                      ? chartsApi.chart4[
                                                            chartIndex
                                                        ].info.averages[2]
                                                      : [0],
                                                  color: "#FBD8D8",
                                              },
                                              {
                                                  name: "Colleagues",
                                                  data: chartsApi.chart4
                                                      ? chartsApi.chart4[
                                                            chartIndex
                                                        ].info.averages[3]
                                                      : [0],
                                                  color: "#EF6461",
                                              },
                                          ]
                                        : []
                                }
                                isLegendBottom={false}
                                labels={
                                    chartsApi.chart4
                                        ? chartsApi.chart4[chartIndex].info
                                              .labels
                                        : []
                                }
                            />
                        </div>
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
                            pathViewAllTo={"/surveys/management"}
                            pathAddTo={"/surveys/management/addSurvey"}
                            pathRowTo={"/surveys/management"}
                            rows={rows}
                            columns={columnsTable}
                            rowsNumber="5"
                            showLastColumn={false}
                            showPagination={false}
                        />
                    </div>
                </main>
            )}
        </>
    );
};

export default SurveyMain;
