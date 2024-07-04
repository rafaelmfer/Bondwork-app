import { useState, useEffect } from "react";
import TableSeven from "../../components/TableSeven";
import Summary from "../../components/summary/Summary";
import ChartArea from "../../components/charts/ChartArea";
import ChartDonut from "../../components/charts/ChartDonut";
import ChartLine from "../../components/charts/ChartLine";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import styles from "../../components/charts/styles.module.css";

const PORT = process.env.REACT_APP_PORT || 5000;
const URL = "http://localhost:" + PORT + "/api/surveys/";

const SurveyMain = () => {
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
            <Summary />
            <div className="grid grid-cols-3 items-center gap-5 p-4" id="chart">
                <div className={styles.fullWidth}>
                    <p className={styles.title16}>
                        Employee Satisfaction Index
                    </p>
                    <ChartDonut />
                </div>
                <div className={styles.fullWidth}>
                    <p className={styles.title16}>Average Score Over Time</p>
                    <ChartArea />
                </div>

                <div className={styles.fullWidth}>
                    <p className={styles.title16}>
                        Overall Satisfaction Drivers
                    </p>
                    <ChartLine chartHeight={200} />
                </div>
            </div>

            <TableSeven
                title={"Survey"}
                //tabsVariant={"variant2"}
                rows={rows}
                columns={columnsTable}
                rowsNumber="5"
                showLastColumn={false}
            />
        </main>
    );
};

export default SurveyMain;
