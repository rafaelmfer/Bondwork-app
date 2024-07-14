import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import SurveyDetailsCard from "../../components/cards/SurveyDetailsCard";
import TableWithProfile from "../../components/TableWithProfile";

const SurveyDetails = () => {
    const { id } = useParams();

    const [rows, setRows] = useState([]);
    const [survey, setSurveys] = useState([]);

    function formatDate(date) {
        const options = { month: "short", day: "2-digit", year: "numeric" };
        return date.toLocaleDateString("en-US", options);
    }
    // Fetch the details of the survey
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/surveys/surveyID/${id}`
                );
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
    }, [id]);

    // Method to create the rows with the employees
    useEffect(() => {
        function createRows(dataArray) {
            if (!Array.isArray(dataArray)) {
                console.error("dataArray não é um array", dataArray);
                return [];
            }
            return dataArray.map((object) => {
                const date = object.survey.completedDate || "";
                const nps = object.survey.NPS || "-";
                return createData(
                    object.employeeID,
                    {
                        profile: object.profilePicture,
                        nameSender: object.userName,
                        jobTitleSender: object.jobTitle,
                    },
                    object.email,
                    date,
                    nps,
                    capitalizeFirstLetter(object.survey.status)
                );
            });
        }
        // create the array that will be passed into the table
        setRows(createRows(survey.audienceDetails));
    }, [survey.audienceDetails]);

    console.log("survey", survey);
    // Save de rows into localstorage to use them in audience list table
    localStorage.setItem("audienceRows", JSON.stringify(rows));
    localStorage.setItem(
        "audienceDetails",
        JSON.stringify(survey.audienceDetails)
    );

    // Method to create the data needed for the rows in the table
    function createData(id, from, email, completed, nps, status) {
        return {
            id,
            from: {
                displayName: `${from.nameSender} (${from.jobTitleSender})`,
                profile: from.profile,
            },
            email,
            completed,
            nps,
            status,
        };
    }

    // Function to change the first letter to uppercase
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    // Array to map the table headings
    const columnsTable = [
        "id",
        "Name / Role",
        "Email",
        "Completed",
        "NPS",
        "Status",
    ];

    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8 h-full">
            <TopUserBar titleScreen={"Survey Details"} />
            <Breadcrumbs dynamicTexts={["Survey Details"]} />
            {survey && rows ? (
                <>
                    <SurveyDetailsCard
                        sx={{ mt: "24px", mb: "24px" }}
                        surveyName={survey.name || ""}
                        department={
                            Array.isArray(survey.departments)
                                ? survey.departments.join(", ")
                                : " "
                        }
                        jobLevel={survey.jobLevel}
                        period={[
                            survey.startDate
                                ? formatDate(new Date(survey.startDate))
                                : " ",
                            survey.endDate
                                ? formatDate(new Date(survey.endDate))
                                : " ",
                        ]}
                        recurrence={
                            survey.recurrence
                                ? capitalizeFirstLetter(survey.recurrence)
                                : " "
                        }
                        points={
                            survey.points !== undefined ? survey.points : " "
                        }
                        description={survey.description || " "}
                    />
                    <div className="border-neutrals-divider border"></div>
                    <div className="flex flex-col gap-4 mx-[-16px] mt-2">
                        <TableWithProfile
                            title={"Audience List"}
                            pathRowTo={`/surveys/management/${id}`}
                            pathViewAllTo={`/surveys/management/list/${id}`}
                            tabsVariant={"variant3"}
                            rows={rows}
                            columns={columnsTable}
                            rowsNumber="5"
                            showSecondColumn={false}
                            showThirdLastColumn={true}
                            showSecondLastColumn={true}
                            showAdd={false}
                            showPagination={false}
                        />
                    </div>
                </>
            ) : (
                <p>Loading ...</p>
            )}
        </main>
    );
};

export default SurveyDetails;
