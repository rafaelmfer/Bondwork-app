import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Box, Card, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import ChipText from "../../components/chip/ChipText";
import ChipNumber from "../../components/chip/ChipNumber";
import QuestionCard from "../../components/QuestionCard";
import theme from "../../theme/theme";

import ProfilePlaceholder from "../../assets/icons/profile-large.svg";
import CustomButton from "../../components/buttons/CustomButton";
import { CheckStatus } from "../../components/checkStatus/CheckStatus";

const SurveyIndividualResponse = () => {
    const navigate = useNavigate();
    const { personId } = useParams();

    // get array from local Storage and searh for one employee inside
    const storedData = localStorage.getItem("audienceDetails");
    const employeesList = JSON.parse(storedData);
    console.log("Teste" + storedData);

    let employee = null;
    if (employeesList) {
        employee = employeesList.find(
            (obj) => obj.employeeID === parseInt(personId)
        );
    }

    // Function to change the first letter to uppercase
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    function formatDate(date) {
        const options = { month: "short", day: "2-digit", year: "numeric" };
        return date.toLocaleDateString("en-US", options);
    }

    // Employee Data
    let profilePicture = employee.profilePicture || ProfilePlaceholder;
    let userName = employee.userName;
    let jobTitle = employee.jobTitle;
    let nps = employee.survey.NPS || "Neutral";
    let employeedID = employee.employeeID;
    let department = employee.departmentName || " ";

    let period = [
        formatDate(new Date(employee.survey.startDate)),
        formatDate(new Date(employee.survey.endDate)),
    ];
    let status = capitalizeFirstLetter(employee.survey.status);

    // TODO: pick the answer of the survey:
    // value = answer
    // chip = last answer
    const data = {
        salary: { value: employee.survey.answers[0] || "-", previousAnswer: 3 },
        companyCulture: {
            value: employee.survey.answers[1] || "-",
            previousAnswer: -3,
        },
        jobRole: {
            value: employee.survey.answers[2] || "-",
            previousAnswer: 3,
        },
        colleagues: {
            value: employee.survey.answers[3] || "-",
            previousAnswer: 3,
        },
    };

    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8 h-full">
            <TopUserBar titleScreen={"Response"} />
            <Breadcrumbs dynamicTexts={["Response", "Survey Details"]} />
            <Card
                sx={{
                    marginTop: "24px",
                    mx: "14%",
                    padding: "24px",
                    boxShadow: "0 0 6px 2px rgba(0, 0, 0, 0.06)",
                    borderRadius: "8px",
                    backgroundColor: theme.palette.neutrals.white,
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "32px",
                    }}
                >
                    <img src={profilePicture} width={85} alt="profile" />
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="start"
                    >
                        <Typography
                            variant="h6"
                            fontWeight={700}
                            color={theme.palette.neutrals.black}
                        >
                            {userName}
                        </Typography>
                        <Typography
                            variant="small2"
                            fontWeight={500}
                            color={theme.palette.neutrals.black}
                        >
                            {jobTitle}
                        </Typography>
                        <ChipText chipText={nps} sx={{ marginTop: "8px" }} />
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "16px",
                        alignItems: "center",
                    }}
                >
                    <Box display="flex" flexDirection="column" gap="8px">
                        <Typography
                            variant="small1"
                            fontWeight={700}
                            color={theme.palette.neutrals.black}
                        >
                            Employee ID
                        </Typography>
                        <Typography
                            variant="small1"
                            fontWeight={700}
                            color={theme.palette.neutrals.black}
                        >
                            Department
                        </Typography>
                    </Box>
                    <Box display="flex" flexDirection="column" gap="10px">
                        <Typography
                            variant="small2"
                            fontWeight={500}
                            color={theme.palette.neutrals.black}
                        >
                            {employeedID}
                        </Typography>
                        <Typography
                            variant="small2"
                            fontWeight={500}
                            color={theme.palette.neutrals.black}
                        >
                            {department}
                        </Typography>
                    </Box>
                </Box>
            </Card>
            <Card
                sx={{
                    marginTop: "16px",
                    mx: "14%",
                    padding: "24px",
                    boxShadow: "0 0 6px 2px rgba(0, 0, 0, 0.06)",
                    borderRadius: "8px",
                    backgroundColor: theme.palette.neutrals.white,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: "8px",
                        marginBottom: "16px",
                    }}
                >
                    <Box
                        sx={{
                            gridColumn: "span 2",
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                        }}
                    >
                        <Typography
                            variant="h6"
                            color={theme.palette.neutrals.black}
                            sx={{ fontWeight: 700 }}
                        >
                            Employee Satisfaction
                        </Typography>
                        <Typography
                            variant="p"
                            color={theme.palette.neutrals.black}
                        >
                            {period.join(" - ")}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                        }}
                    >
                        <Typography
                            variant="h6"
                            color={theme.palette.neutrals.black}
                            sx={{ fontWeight: 700 }}
                        >
                            Status
                        </Typography>
                        <Box display="flex" alignItems="center" mb={1}>
                            <CheckStatus status={status} />
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            textAlign: "end",
                        }}
                    >
                        <Typography
                            variant="small1"
                            color={theme.palette.neutrals.gray300}
                        >
                            Compared to previous period
                        </Typography>
                    </Box>
                </Box>
                <Box display="grid" gridTemplateColumns="repeat(4, 1fr)">
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                    >
                        <Typography
                            variant="small1"
                            color={theme.palette.neutrals.gray300}
                        >
                            Salary
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <Typography variant="h1">
                                {data.salary.value}
                            </Typography>
                            <ChipNumber
                                chipText={data.salary.previousAnswer}
                                sx={{ ml: 1 }}
                            />
                        </Box>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                    >
                        <Typography
                            variant="small1"
                            color={theme.palette.neutrals.gray300}
                        >
                            Company Culture
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <Typography variant="h1">
                                {data.companyCulture.value}
                            </Typography>
                            <ChipNumber
                                chipText={data.companyCulture.previousAnswer}
                                sx={{ ml: 1 }}
                            />
                        </Box>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                    >
                        <Typography
                            variant="small1"
                            color={theme.palette.neutrals.gray300}
                        >
                            Job Role
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <Typography variant="h1">
                                {data.jobRole.value}
                            </Typography>
                            <ChipNumber
                                chipText={data.jobRole.previousAnswer}
                                sx={{ ml: 1 }}
                            />
                        </Box>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                    >
                        <Typography
                            variant="small1"
                            color={theme.palette.neutrals.gray300}
                        >
                            Colleagues
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <Typography variant="h1">
                                {data.colleagues.value}
                            </Typography>
                            <ChipNumber
                                chipText={data.colleagues.previousAnswer}
                                sx={{ ml: 1 }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Card>
            <Card
                sx={{
                    marginTop: "16px",
                    mx: "14%",
                    padding: "24px",
                    boxShadow: "0 0 6px 2px rgba(0, 0, 0, 0.06)",
                    borderRadius: "8px",
                    backgroundColor: theme.palette.neutrals.white,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Box>
                    <QuestionCard
                        question={
                            "1. How satisfied are you with your current salary and benefits package?"
                        }
                        initialSelectedValue={data.salary.value}
                        isDisabled={true}
                    />
                    <QuestionCard
                        sx={{ mt: "16px" }}
                        question={
                            "2. How satisfied are you with the company culture?"
                        }
                        initialSelectedValue={data.companyCulture.value}
                        isDisabled={true}
                    />
                    <QuestionCard
                        sx={{ mt: "16px" }}
                        question={
                            "3. How satisfied are you with your job role and responsibilities?"
                        }
                        initialSelectedValue={data.jobRole.value}
                        isDisabled={true}
                    />
                    <QuestionCard
                        sx={{ mt: "16px" }}
                        question={
                            "4. How satisfied are you with the level of collaboration and support with your colleagues?"
                        }
                        initialSelectedValue={data.colleagues.value}
                        isDisabled={true}
                    />
                </Box>
            </Card>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "end",
                    mx: "14%",
                    marginTop: "24px",
                }}
            >
                <CustomButton
                    buttontype="primary"
                    buttonVariant="text"
                    onClick={() => navigate(-1)}
                    sx={{
                        marginBottom: "24px",
                    }}
                >
                    Back to List
                </CustomButton>
            </Box>
        </main>
    );
};

export default SurveyIndividualResponse;
