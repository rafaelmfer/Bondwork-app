import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TableSeven from "../../components/TableSeven";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";

// const PORT = process.env.REACT_APP_PORT || 5000;
const URL = `${process.env.REACT_APP_API_URL}/api/surveys/`;

const Management = () => {
    //Hook for the survey array
    const [surveys, setSurveys] = useState([]);

    const location = useLocation();
    const { data } = location.state || {};

    // Fetching the survey.json @Backend
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

        // If data is not null we set survies = data. If not we fetch
        if (data && data.length > 0) {
            setSurveys(data);
        } else {
            fetchData();
        }
    }, [data]);
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
                object.surveyId,
                object.name,
                formatDate(new Date(object.startDate)),
                formatDate(new Date(object.endDate)),
                object.completed?.length || 0,
                object.sent?.length || 0,
                object.status
            )
        );
    }
    // create the array that will be passed into the table
    const rows = createRows(surveys);

    return (
        <div>
            <TopUserBar titleScreen={"Management"} />
            <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8 h-full">
                <Breadcrumbs />
                <TableSeven
                    width="100%"
                    showTitle={false}
                    title={"Management"}
                    pathAddTo={"/surveys/management/addSurvey"}
                    showSend={true}
                    showFilter={true}
                    rows={rows}
                    columns={columnsTable}
                    rowsNumber="15"
                    showSecondLastColumn={false}
                    showLastColumn={false}
                />
            </main>
        </div>
    );
};

export default Management;
