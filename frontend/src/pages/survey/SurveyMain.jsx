import { useState, useEffect } from "react";
import TableSeven from "../../components/TableSeven";
import Summary from "../../components/summary/Summary";
import ChartArea from "../../components/charts/ChartArea";
import ChartDonut from "../../components/charts/ChartDonut";
import ChartLine from "../../components/charts/ChartLine";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import SummaryCard from "../../components/cards/SummaryCard";

const PORT = process.env.REACT_APP_PORT || 5000;
const URL = "http://localhost:" + PORT + "/api/surveys/";

const SurveyMain = () => {
    // Summary Card data
    const Summarydata = {
        totalEmployees: { value: 1500, chip: 6 },
        surveySent: { value: 300, chip: -6 },
        received: { value: 230, chip: 6 },
        completed: { value: 150, chip: 6 },
        averageTime: { value: 5, chip: -1 },
    };

    const [surveys, setSurveys] = useState([]);

    // Fetching surveys
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(URL);
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
    }, []);

    // Array to map the table headings
    const columnsTable = [
        "id",
        "Survey Name",
        "Created In",
        "Expired Date",
        "Viewed",
        "Completed",
        "Status",
    ];
    // Method to format the date in eg. Jul 01, 2024
    function formatDate(date) {
        const options = { month: "short", day: "2-digit", year: "numeric" };
        return date.toLocaleDateString("en-US", options);
    }
    // method with the columns needed for the table
    function createData(
        id,
        surveyName,
        createdIn,
        expired,
        viewed,
        completed,
        status
    ) {
        return {
            id,
            surveyName,
            createdIn,
            expired,
            viewed,
            completed,
            status,
        };
    }
    // method to structure the data into the fields that we need
    function createRows(dataArray) {
        return dataArray.map((object) =>
            createData(
                object._id,
                object.name,
                formatDate(new Date(object.startDate)),
                formatDate(new Date(object.endDate)),
                object.answered?.length || 0,
                object.requested?.length || 0,
                object.status
            )
        );
    }
    // create the array that will be passed into the table
    const rows = createRows(surveys);

    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8">
            <TopUserBar titleScreen={"Surveys"} />
            <Breadcrumbs />

            <SummaryCard data={Summarydata} sx={{ mt: 3 }} />
            <div
                className="h-full grid grid-cols-3 items-center gap-5 mt-6 mb-6"
                id="chart"
            >
                <div className="chart-donut-card bg-main-50 flex flex-col h-full shadow-[0px_0px_6px_2px_rgba(0,0,0,0.06)] p-4 rounded-lg">
                    <h4 className="text-h4 text-neutrals-black mb-2">
                        Employee Satisfaction Index
                    </h4>
                    <ChartDonut
                        className="chart-donut-survey-main flex flex-col justify-center h-full"
                        chartHeight={150}
                    />
                </div>
                <div className="chart-area-card h-full bg-main-50 shadow-[0px_0px_6px_2px_rgba(0,0,0,0.06)] p-4 rounded-lg">
                    <h4 className="text-h4 text-neutrals-black mb-2">
                        Average Score Over Time
                    </h4>
                    <ChartArea
                        className="chart-area-survey-main"
                        chartHeight={150}
                    />
                </div>

                <div className="chart-line-card h-full bg-main-50 shadow-[0px_0px_6px_2px_rgba(0,0,0,0.06)] p-4 rounded-lg">
                    <h4 className="text-h4 text-neutrals-black mb-2">
                        Overall Satisfaction Drivers
                    </h4>
                    <ChartLine
                        className="chart-line-survey-main"
                        chartHeight={150}
                    />
                </div>
            </div>

            <div className="border-neutrals-divider border"></div>

            <div className="flex flex-col gap-4 mx-[-16px] mt-2">
                <TableSeven
                    title={"Management"}
                    //tabsVariant={"variant2"}
                    rows={rows}
                    columns={columnsTable}
                    rowsNumber="5"
                    showLastColumn={false}
                />
            </div>
        </main>
    );
};

export default SurveyMain;
