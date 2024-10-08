import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TableSeven from "../../components/TableSeven";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import useAuthToken from "../../common/decodeToken";
import { formatDate } from "../../common/commonFunctions";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

// const PORT = process.env.REACT_APP_PORT || 5000;
const URL = `${process.env.REACT_APP_API_URL}/api/surveys/`;

const Management = () => {
    const { token, isTokenValid } = useAuthToken();
    const navigate = useNavigate();
    //Hook for the survey array
    const [surveys, setSurveys] = useState([]);

    const location = useLocation();
    const { data } = location.state || {};

    const [isLoading, setIsLoading] = useState(false);

    // Fetching the survey.json @Backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!isTokenValid) {
                    console.log("Token is invalid or has expired");
                    navigate("/login");
                    return;
                }
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
                setIsLoading(true);
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
    }, [data, isTokenValid, token, navigate]);
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
        sent,
        status
    ) {
        return {
            id,
            surveyName,
            createdIn,
            expired,
            completed,
            sent,
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
        <>
            {!isLoading ? (
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
                <div style={{ animation: "fadeIn 1.5s" }}>
                    <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8 h-[calc(100vh-80px)]">
                        <TopUserBar titleScreen={"Management"} />
                        <Breadcrumbs />
                        <div className="flex flex-col gap-4 mx-[-16px]">
                            <TableSeven
                                showTitle={false}
                                title={"Management"}
                                pathAddTo={"/surveys/management/addSurvey"}
                                pathRowTo={"/surveys/management"}
                                showSend={true}
                                showFilter={true}
                                rows={rows}
                                columns={columnsTable}
                                rowsNumber="7"
                                showSecondLastColumn={true}
                                showLastColumn={false}
                            />
                        </div>
                    </main>
                </div>
            )}
        </>
    );
};

export default Management;
