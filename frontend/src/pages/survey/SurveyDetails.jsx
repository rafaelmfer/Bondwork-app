import React from "react";
import { useState, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import SurveyDetailsCard from "../../components/cards/SurveyDetailsCard";
import TableWithProfile from "../../components/TableWithProfile";
//import theme from "../../../theme/theme";

// All of this is to allow multiple savings during the first fetch
const initialState = {
    survey: null,
    answered: [],
    requested: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_SURVEY":
            return {
                ...state,
                survey: action.payload,
                answered: action.payload.answered || [],
                requested: action.payload.requested || [],
            };
        default:
            return state;
    }
};

const SurveyDetails = () => {
    const { id } = useParams();
    const [state, dispatch] = useReducer(reducer, initialState);
    const { survey, answered, requested } = state;
    const [usersIds, setUsersIds] = useState([]);
    const [tableData, setTableData] = useState([]);

    const PORT = process.env.REACT_APP_PORT || 5000;

    // fetch the details of the survey
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/surveys/${id}`
                );
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const data = await res.json();
                dispatch({ type: "SET_SURVEY", payload: data });
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };
        fetchData();
    }, [id, PORT]);
    console.log("SURVEY", survey);

    // combine the arrays
    useEffect(() => {
        if (Array.isArray(answered) && Array.isArray(requested)) {
            setUsersIds([...answered, ...requested]);
        }
    }, [answered, requested]);

    // create an array of user objects for the table
    useEffect(() => {
        if (usersIds.length > 0) {
            const fetchUserDetails = async () => {
                try {
                    const userDetails = await Promise.all(
                        usersIds.map(async (userId) => {
                            const res = await fetch(
                                `${process.env.REACT_APP_API_URL}/api/user/${userId}`
                            );
                            if (!res.ok) {
                                throw new Error(
                                    `HTTP error! Status: ${res.status}`
                                );
                            }
                            return await res.json();
                        })
                    );

                    const transformedData = createRows(userDetails);
                    console.log("transformed idsss ", transformedData);
                    setTableData(transformedData);
                } catch (error) {
                    console.log("Error fetching user details", error);
                }
            };
            fetchUserDetails();
        }
    }, [usersIds, PORT]);

    // Método para estructurar los datos en los campos que necesitamos
    function createRows(dataArray) {
        if (!Array.isArray(dataArray)) {
            console.error("dataArray não é um array", dataArray);
            return [];
        }
        return dataArray.map((object) => {
            const survey = object.surveys.find((survey) => survey.id === id);
            const date = survey?.date ? formatDate(new Date(survey.date)) : "-";
            return createData(
                object.employeeID,
                {
                    myObject: object,
                    svgImage: object.profilePicture,
                    userName: object.firstName,
                    jobTitle: object.jobTitle,
                },
                object.email,
                date,
                object.NPS,
                survey?.status // id of survey
            );
        });
    }

    // Método para crear los datos necesarios para las filas de la tabla
    function createData(id, from, email, completed, nps, status) {
        return {
            id,
            from: {
                myObject: from.myObject,
                svgImage: from.svgImage,
                displayName: `${from.userName} (${from.jobTitle})`,
            },
            email,
            completed,
            nps,
            status,
        };
    }
    // method to format the date in eg. Jul 01, 2024
    function formatDate(date) {
        const options = { month: "short", day: "2-digit", year: "numeric" };
        return date.toLocaleDateString("en-US", options);
    }
    // Función para capitalizar la primera letra
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
            {survey && tableData ? (
                <>
                    <SurveyDetailsCard
                        sx={{ mt: "24px", mb: "24px" }}
                        surveyName={survey.name}
                        department={survey.departments.join(", ")}
                        jobLevel={survey.jobLevel}
                        period={[
                            formatDate(new Date(survey.startDate)),
                            formatDate(new Date(survey.endDate)),
                        ]} // Check the end date of the survey
                        recurrence={capitalizeFirstLetter(survey.recurrence)}
                        points={survey.points}
                        description={survey.description}
                    />
                    <div className="border-neutrals-divider border"></div>
                    <div className="flex flex-col gap-4 mx-[-16px] mt-2">
                        {/* CHANGE IN THE COMPONENT THE STATUS TO BE ALWAYS CAPITALIZED */}
                        <TableWithProfile
                            title={"Audience List"}
                            pathRowTo={""}
                            tabsVariant={"variant2"}
                            rows={tableData}
                            columns={columnsTable}
                            rowsNumber="5"
                            showSecondColumn={false}
                            showThirdLastColumn={true}
                            showSecondLastColumn={true}
                            showAdd={false}
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
