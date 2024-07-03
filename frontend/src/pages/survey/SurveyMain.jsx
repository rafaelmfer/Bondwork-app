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
const URL = "http://localhost:" + PORT + "/api/survies/survies";

const SurveyMain = () => {
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
            />
        </main>
    );
};

export default SurveyMain;
