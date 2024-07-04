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
const URL = "http://localhost:" + PORT + "/api/survies/survies";

const SurveyMain = () => {
    // Summary Card data
    const Summarydata = {
        totalEmployees: { value: 1500, chip: 6 },
        surveySent: { value: 300, chip: -6 },
        received: { value: 230, chip: 6 },
        completed: { value: 150, chip: 6 },
        averageTime: { value: 5, chip: -1 },
    };

    //Hook for the survey array
    const [survies, setSurvies] = useState([]);

    // Fetching the survey.json @Backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(URL);
                const data = await res.json();

                setSurvies(data.survies);
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
        "Dropouts",
        "Status",
    ];
    // method to format the date in eg. Jul 01, 2024
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
        dropouts,
        status
    ) {
        return {
            id,
            surveyName,
            createdIn,
            expired,
            viewed,
            completed,
            dropouts,
            status,
        };
    }
    // method to structure the data into the fields that we need
    function createRows(dataArray) {
        return dataArray.map((object, index) =>
            createData(
                index + 1,
                object.surveyName,
                formatDate(new Date(object.createdIn)),
                formatDate(new Date(object.expired)),
                object.viewed,
                object.completed,
                object.dropouts,
                object.status
            )
        );
    }
    // create the array that will be passed into the table
    const rows = createRows(survies);

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
                    title={"Survey"}
                    //tabsVariant={"variant2"}
                    rows={rows}
                    columns={columnsTable}
                    rowsNumber="5"
                />
            </div>
        </main>
    );
};

export default SurveyMain;
