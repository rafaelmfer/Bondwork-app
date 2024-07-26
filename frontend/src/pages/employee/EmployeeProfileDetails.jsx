import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import EmployeeProfileTitleCard from "../../components/cards/EmployeeProfileTitleCard";
import EmployeeProfileInfoCard from "../../components/cards/EmployeeProfileInfoCard";
import EmployeeProfilePointsCard from "../../components/cards/EmployeeProfilePointsCard";
import TableSeven from "../../components/TableSeven";
import TableWithProfile from "../../components/TableWithProfile";
import useAuthToken from "../../common/decodeToken";

import {
    formatDate,
    formatDate2,
    capitalizeFirstLetter,
} from "../../common/commonFunctions";

const EmployeeProfileDetails = () => {
    const { token, isTokenValid } = useAuthToken();
    const navigate = useNavigate();
    const { id } = useParams();
    const URL = `${process.env.REACT_APP_API_URL}/api/user/${id}`;

    const [user, setUser] = useState([]);

    // Fetching user details
    useEffect(() => {
        const fetchData = async () => {
            if (!isTokenValid) {
                console.log("Token is invalid or has expired");
                navigate("/login");
                return;
            }
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
                setUser(data);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };
        fetchData();
    }, [URL, token, isTokenValid, navigate]);

    // ----- Recognition table ----------------------------------
    const recognitionHeaders = ["id", "From", "To", "Date", "Status"];

    function createRecognition(id, from, to, dateRequest, status) {
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
            dateRequest,
            status,
        };
    }

    function createRowsRecognition(dataArray) {
        return dataArray.map((object) =>
            createRecognition(
                object.recognitionId,
                {
                    profile: object.sender.profilePicture,
                    nameSender: `${object.sender.firstName} ${object.sender.lastName.charAt(0).toUpperCase()}.`,
                    jobTitleSender: object.sender.jobTitle,
                },
                {
                    profile: object.receiver.profilePicture,
                    nameReceiver: `${object.receiver.firstName} ${object.receiver.lastName.charAt(0).toUpperCase()}.`,
                    jobTitleReceiver: object.receiver.jobTitle,
                },
                object.dateRequest,
                object.status
            )
        );
    }

    const recognitionRows = user?.recognitions
        ? createRowsRecognition(user.recognitions)
        : [];
    // ----- Reward table ----------------------------------
    const rewardHeaders = [
        "id",
        "Title",
        "Category",
        "Points",
        "Date",
        "Status",
    ];

    function createReward(id, title, category, points, requestDate, status) {
        return {
            id,
            title,
            category,
            points,
            requestDate,
            status,
        };
    }

    function createRowsReward(dataArray) {
        return dataArray.map((object) =>
            createReward(
                object.rewardId,
                object.title,
                object.category,
                object.pointsCost,
                object.requestDate,
                capitalizeFirstLetter(object.status)
            )
        );
    }

    // Constrain to make sure that the user array is defined
    const rewardRows = user?.rewards ? createRowsReward(user.rewards) : [];

    // ----- Survey table ----------------------------------
    // Array to map the table headings
    const surveyHeaders = [
        "id",
        "Survey Name",
        "Created In",
        "Expired Date",
        "Status",
    ];

    function createSurvey(id, surveyName, createdIn, expired, status) {
        return {
            id,
            surveyName,
            createdIn,
            expired,
            status,
        };
    }
    function createRowsSurvey(dataArray) {
        return dataArray.map((object) =>
            createSurvey(
                object.id,
                object.surveyName,
                object.startDate,
                object.endDate,
                capitalizeFirstLetter(object.status)
            )
        );
    }

    // Constrain to make sure that the user array is defined
    const surveyRows = user?.surveys ? createRowsSurvey(user.surveys) : [];

    // Get NPS and relative info about the last Survey answered
    function getNPS(dataArray) {
        let latestDate = new Date("2000-01-01");
        let nps = null;
        let name = null;
        let answers = [];

        dataArray.forEach((object) => {
            if (capitalizeFirstLetter(object.status) === "Completed") {
                const surveyDate = new Date(object.date);
                if (surveyDate > latestDate) {
                    latestDate = surveyDate;
                    nps = object.NPS;
                    name = object.surveyName;
                    answers = [...object.answers];
                }
            }
        });

        return { nps: nps, name: name, date: latestDate, answers: answers };
    }

    const lastSurvey = user?.surveys ? getNPS(user.surveys) : " ";

    // Save de rows into localstorage to use them in audience list table
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("lastSurvey", JSON.stringify(lastSurvey));
    localStorage.setItem("recognitionRows", JSON.stringify(recognitionRows));
    localStorage.setItem("rewardRows", JSON.stringify(rewardRows));
    localStorage.setItem("surveyRows", JSON.stringify(surveyRows));

    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8">
            <TopUserBar titleScreen={"Employees"} />
            <Breadcrumbs dynamicTexts={["Details"]} />

            <div className="mt-4 grid grid-cols-[336px_minmax(600px,_1fr)] gap-x-4">
                {user && (
                    <section className="leftColumn">
                        <EmployeeProfileTitleCard
                            Name={`${user.firstName} ${user.lastName}` || " "}
                            JobTitle={user.jobTitle || " "}
                            OnBoardingDate={
                                formatDate2(user.onBoardingDate) || " "
                            }
                            imageSrc={user.profilePicture}
                            chipText={lastSurvey ? lastSurvey.nps : " "}
                        />
                        <EmployeeProfileInfoCard
                            EmployeeID={user.employeeID || " "}
                            JobLevel={user.jobLevel || " "}
                            Department={user.department?.name || " "}
                            Email={user.email || " "}
                            LastAccess={formatDate2(user.lastAccess) || " "}
                            HireDate={formatDate2(user.onBoardingDate) || " "}
                            Termination={
                                user.terminationDate
                                    ? formatDate2(user.terminationDate)
                                    : "-"
                            }
                            LastSurveyAnsweredDate={
                                lastSurvey
                                    ? formatDate(new Date(lastSurvey.date))
                                    : "-"
                            }
                            Salary={
                                lastSurvey.answers ? lastSurvey.answers[0] : "-"
                            }
                            CompanyCulture={
                                lastSurvey.answers ? lastSurvey.answers[1] : "-"
                            }
                            JobRole={
                                lastSurvey.answers ? lastSurvey.answers[2] : "-"
                            }
                            Colleagues={
                                lastSurvey.answers ? lastSurvey.answers[3] : "-"
                            }
                        />
                        <EmployeeProfilePointsCard
                            CurrentPoints={
                                user.points
                                    ? user.points.toLocaleString()
                                    : user.points
                            }
                            PointsExpireDate={["Jul/2024"]}
                            PointsWillExpire={350}
                        />
                    </section>
                )}

                {user && (
                    <section className="rigthColumn flex flex-col gap-4">
                        <TableWithProfile
                            width="100%"
                            margin="0"
                            title={"Recognitions"}
                            pathRowTo={"/recognitions/requests"}
                            pathViewAllTo={`/users/${id}/recognitions`}
                            rows={recognitionRows}
                            columns={recognitionHeaders}
                            rowsNumber="5"
                            showSecondColumn={true}
                            showThirdLastColumn={false}
                            showSecondLastColumn={false}
                            showLastColumn={false}
                            showTabs={false}
                            showSearch={false}
                            showAdd={false}
                            showCheckboxColumn={false}
                            showBtnColumn={false}
                            showPagination={false}
                        />
                        <TableSeven
                            width="100%"
                            margin="0"
                            title={"Rewards"}
                            pathViewAllTo={`/users/${id}/rewards`}
                            pathRowTo={`/rewards/requests/{rowId}/${id}`}
                            rows={rewardRows}
                            columns={rewardHeaders}
                            rowsNumber="5"
                            showBtnColumn={false}
                            showCheckboxColumn={false}
                            showSecondLastColumn={false}
                            showLastColumn={false}
                            showPagination={false}
                            showTabs={false}
                            showAdd={false}
                            showSearch={false}
                        />
                        <TableSeven
                            width="100%"
                            margin="0"
                            title={"Surveys"}
                            pathViewAllTo={`/users/${id}/surveys`}
                            pathRowTo={`/surveys/management/{rowId}/${id}`}
                            rows={surveyRows}
                            columns={surveyHeaders}
                            rowsNumber="5"
                            showBtnColumn={false}
                            showCheckboxColumn={false}
                            showSecondLastColumn={false}
                            showThirdLastColumn={false}
                            showLastColumn={false}
                            showPagination={false}
                            showTabs={false}
                            showAdd={false}
                            showSearch={false}
                        />
                    </section>
                )}
            </div>
        </main>
    );
};

export default EmployeeProfileDetails;
