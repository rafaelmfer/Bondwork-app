const Recognition = require("../models/RecognitionModel");
const Rewards = require("../models/RewardsModel");
const Surveys = require("../models/SurveyModel");
const User = require("../models/UserModel");
const moment = require("moment");

const { getPeriodDates } = require("../utils/utils");

const { allUser } = require("./userController");

const getDashboardCharts = async (req, res) => {
    try {
        const { date } = req.body;

        const chart1 = await averageScoreSurveys(date);
        const chart2 = await averageScoreSurveys(date);
        const chart3 = await recognitionsByStatus(date);
        const chart4 = await rewardsRequestByStatus(date);

        res.status(200).json({
            chart1,
            chart2,
            chart3,
            chart4,
        });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getRecognitionsByStatus = async (req, res) => {
    try {
        const { date } = req.body;
        const results = await recognitionsByStatus(date);

        res.status(200).json(results);
    } catch (error) {
        console.error("Error fetching recognition data:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getRecognitionByCategory = async (req, res) => {
    try {
        const { date } = req.body;
        const results = await recognitionByCategory(date);
        res.status(200).json(results);
    } catch (error) {
        console.error("Error fetching recognition data:", error);
        res.status(500).json({ message: "Server error" });
    }
};
const getRewardsManagementByStatus = async (req, res) => {
    try {
        const { date } = req.body;
        const results = await rewardsManagementByStatus(date);

        res.status(200).json(results);
    } catch (error) {
        console.error("Error fetching rewards management data:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getRewardsRequestByStatus = async (req, res) => {
    try {
        const { date } = req.body;
        const results = rewardsRequestByStatus(date);

        res.status(200).json(results);
    } catch (error) {
        console.error("Error fetching recognition data:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getSurveysManagementByStatus = async (req, res) => {
    try {
        const { date } = req.body;
        const results = await surveysManagementByStatus(date);

        // Send the response with the calculated results
        res.status(200).json(results);
    } catch (error) {
        console.error("Error fetching surveys management data:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getSatisfactionIndex = async (req, res) => {
    try {
        const { date } = req.body; // Extract the date from the request body
        const results = await satisfactionIndex(date); // Convert the date to a Date object

        // Send the final results as a JSON response
        res.status(200).json(results);
    } catch (error) {
        console.error("Error fetching satisfaction surveys data:", error); // Log errors
        res.status(500).json({ message: "Server error" }); // Send an error response
    }
};

const getAverageScore = async (req, res) => {
    try {
        // Extract the date from the request body
        const { date } = req.body;
        const results = await averageScoreSurveys(date);

        console.log(results);
        // Return the results as JSON
        res.status(200).json(results);
    } catch (error) {
        console.error("Error fetching average score data:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// HELPERS =======================================================================
const recognitionsByStatus = async (date) => {
    try {
        const initialDate = new Date(date);

        const units = [
            { unit: "week", periods: 3 },
            { unit: "month", periods: 3 },
            { unit: "quarter", periods: 3 },
            { unit: "annual", periods: 2 },
        ];

        const results = [];

        for (const { unit, periods } of units) {
            const unitResults = [];

            for (let i = 0; i < periods; i++) {
                const periodDate = new Date(initialDate);
                switch (unit) {
                    case "week":
                        periodDate.setDate(initialDate.getDate() - 7 * i);
                        break;
                    case "month":
                        periodDate.setMonth(initialDate.getMonth() - i);
                        break;
                    case "quarter":
                        periodDate.setMonth(initialDate.getMonth() - 3 * i);
                        break;
                    case "annual":
                        periodDate.setFullYear(initialDate.getFullYear() - i);
                        break;
                }

                const { startCurrent, endCurrent, startPrevious, endPrevious } =
                    getPeriodDates(unit, periodDate);

                const currentRecognitions = await Recognition.find({});

                const currentStatusCounts = currentRecognitions.reduce(
                    (acc, recognition) => {
                        const requestDate = new Date(recognition.dateRequest);
                        if (i === 0) {
                            if (
                                requestDate >= startCurrent &&
                                requestDate <= initialDate
                            ) {
                                acc.totalAmount += 1;
                                acc[recognition.status.toLowerCase()] += 1;
                            }
                            return acc;
                        } else {
                            if (
                                requestDate >= startCurrent &&
                                requestDate <= endCurrent
                            ) {
                                acc.totalAmount += 1;
                                acc[recognition.status.toLowerCase()] += 1;
                            }
                            return acc;
                        }
                    },
                    { totalAmount: 0, pending: 0, approved: 0, rejected: 0 }
                );

                const previousStatusCounts = currentRecognitions.reduce(
                    (acc, recognition) => {
                        const requestDate = new Date(recognition.dateRequest);
                        if (
                            requestDate >= startPrevious &&
                            requestDate <= endPrevious
                        ) {
                            acc.totalAmount += 1;
                            acc[recognition.status.toLowerCase()] += 1;
                        }
                        return acc;
                    },
                    { totalAmount: 0, pending: 0, approved: 0, rejected: 0 }
                );

                const badgeCount =
                    currentStatusCounts.totalAmount -
                    previousStatusCounts.totalAmount;
                const pendingBadge =
                    currentStatusCounts.pending - previousStatusCounts.pending;
                const approvedBadge =
                    currentStatusCounts.approved -
                    previousStatusCounts.approved;
                const rejectedBadge =
                    currentStatusCounts.rejected -
                    previousStatusCounts.rejected;

                unitResults.push({
                    from: startCurrent.toISOString().split("T")[0],
                    to: endCurrent.toISOString().split("T")[0],
                    totalAmount: currentStatusCounts.totalAmount,
                    badgeCount,
                    statusCounts: {
                        pending: currentStatusCounts.pending,
                        pendingBadge,
                        approved: currentStatusCounts.approved,
                        approvedBadge,
                        rejected: currentStatusCounts.rejected,
                        rejectedBadge,
                    },
                });
            }

            results.push({
                filter: unit.charAt(0).toUpperCase() + unit.slice(1),
                info: unitResults,
            });
        }

        return results;
    } catch (error) {
        console.error("Error fetching recognition data:", error);
        throw new Error(error.message);
    }
};

const recognitionByCategory = async (date) => {
    try {
        const initialDate = new Date(date);

        const units = [
            { unit: "week", periods: 3 },
            { unit: "month", periods: 3 },
            { unit: "quarter", periods: 3 },
            { unit: "annual", periods: 2 },
        ];

        const results = [];

        for (const { unit, periods } of units) {
            const unitResults = [];

            for (let i = 0; i < periods; i++) {
                const periodDate = new Date(initialDate);
                switch (unit) {
                    case "week":
                        periodDate.setDate(initialDate.getDate() - 7 * i);
                        break;
                    case "month":
                        periodDate.setMonth(initialDate.getMonth() - i);
                        break;
                    case "quarter":
                        periodDate.setMonth(initialDate.getMonth() - 3 * i);
                        break;
                    case "annual":
                        periodDate.setFullYear(initialDate.getFullYear() - i);
                        break;
                }

                const { startCurrent, endCurrent, startPrevious, endPrevious } =
                    getPeriodDates(unit, periodDate);

                const currentRecognitions = await Recognition.find({});

                const currentCategoryCounts = currentRecognitions.reduce(
                    (acc, recognition) => {
                        const requestDate = new Date(recognition.dateRequest);
                        if (i === 0) {
                            if (
                                requestDate >= startCurrent &&
                                requestDate <= initialDate
                            ) {
                                acc[recognition.category.toLowerCase()] += 1;
                            }
                            return acc;
                        } else {
                            if (
                                requestDate >= startCurrent &&
                                requestDate <= endCurrent
                            ) {
                                acc[recognition.category.toLowerCase()] += 1;
                            }
                            return acc;
                        }
                    },
                    {
                        performance: 0,
                        leadership: 0,
                        teamwork: 0,
                        creativity: 0,
                    }
                );

                const previousCategoryCounts = currentRecognitions.reduce(
                    (acc, recognition) => {
                        const requestDate = new Date(recognition.dateRequest);
                        if (
                            requestDate >= startPrevious &&
                            requestDate <= endPrevious
                        ) {
                            acc.totalAmount += 1;
                            acc[recognition.category.toLowerCase()] += 1;
                        }
                        return acc;
                    },
                    {
                        performance: 0,
                        leadership: 0,
                        teamwork: 0,
                        creativity: 0,
                    }
                );

                unitResults.push({
                    from: startCurrent.toISOString().split("T")[0],
                    to: endCurrent.toISOString().split("T")[0],
                    current: [
                        currentCategoryCounts.performance,
                        currentCategoryCounts.leadership,
                        currentCategoryCounts.teamwork,
                        currentCategoryCounts.creativity,
                    ],
                    previous: [
                        previousCategoryCounts.performance,
                        previousCategoryCounts.leadership,
                        previousCategoryCounts.teamwork,
                        previousCategoryCounts.creativity,
                    ],
                });
            }

            results.push({
                filter: unit.charAt(0).toUpperCase() + unit.slice(1),
                info: unitResults,
            });
        }

        return results;
    } catch (error) {
        console.error("Error fetching recognition data:", error);
        throw new Error(error.message);
    }
};

const rewardsManagementByStatus = async (date) => {
    try {
        const initialDate = new Date(date);

        const units = [
            { unit: "week", periods: 3 },
            { unit: "month", periods: 3 },
            { unit: "quarter", periods: 3 },
            { unit: "annual", periods: 2 },
        ];

        const results = [];

        for (const { unit, periods } of units) {
            const unitResults = [];

            for (let i = 0; i < periods; i++) {
                const periodDate = new Date(initialDate);
                switch (unit) {
                    case "week":
                        periodDate.setDate(initialDate.getDate() - 7 * i);
                        break;
                    case "month":
                        periodDate.setMonth(initialDate.getMonth() - i);
                        break;
                    case "quarter":
                        periodDate.setMonth(initialDate.getMonth() - 3 * i);
                        break;
                    case "annual":
                        periodDate.setFullYear(initialDate.getFullYear() - i);
                        break;
                }

                const { startCurrent, endCurrent, startPrevious, endPrevious } =
                    getPeriodDates(unit, periodDate);

                const currentRewards = await Rewards.find({});

                // Use initialDate for i = 0, otherwise use endCurrent
                const periodEndDate = i === 0 ? initialDate : endCurrent;

                const currentStatusCounts = currentRewards.reduce(
                    (acc, reward) => {
                        if (
                            reward.status === "Ongoing" &&
                            new Date(reward.endDate) <= periodEndDate
                        ) {
                            acc.ongoing += 1;
                            acc.totalAmount += 1;
                        }
                        if (
                            reward.status === "Upcoming" &&
                            new Date(reward.startDate) >= startCurrent
                        ) {
                            acc.upcoming += 1;
                            acc.totalAmount += 1;
                        }
                        return acc;
                    },
                    { totalAmount: 0, ongoing: 0, upcoming: 0 }
                );

                const previousStatusCounts = currentRewards.reduce(
                    (acc, reward) => {
                        if (
                            reward.status === "Ongoing" &&
                            new Date(reward.endDate) <= endPrevious
                        ) {
                            acc.ongoing += 1;
                            acc.totalAmount += 1;
                        }
                        if (
                            reward.status === "Upcoming" &&
                            new Date(reward.startDate) >= startPrevious
                        ) {
                            acc.upcoming += 1;
                            acc.totalAmount += 1;
                        }
                        return acc;
                    },
                    { totalAmount: 0, ongoing: 0, upcoming: 0 }
                );

                // console.log(unit, periodDate)
                // console.log(
                //     `Current Status Counts: ${JSON.stringify(currentStatusCounts)}`
                // );
                // console.log(
                //     `Previous Status Counts: ${JSON.stringify(previousStatusCounts)}`
                // );

                const badgeCount =
                    currentStatusCounts.totalAmount -
                    previousStatusCounts.totalAmount;
                const ongoingBadge =
                    currentStatusCounts.ongoing - previousStatusCounts.ongoing;
                const upcomingBadge =
                    currentStatusCounts.upcoming -
                    previousStatusCounts.upcoming;

                unitResults.push({
                    from: startCurrent.toISOString().split("T")[0],
                    to: endCurrent.toISOString().split("T")[0],
                    totalAmount: currentStatusCounts.totalAmount,
                    badgeCount,
                    statusCounts: {
                        ongoing: currentStatusCounts.ongoing,
                        ongoingBadge,
                        upcoming: currentStatusCounts.upcoming,
                        upcomingBadge,
                    },
                });
            }

            results.push({
                filter: unit.charAt(0).toUpperCase() + unit.slice(1),
                info: unitResults,
            });
        }

        return results;
    } catch (error) {
        console.error("Error fetching rewards management data:", error);
        throw new Error(error.message);
    }
};

// Get the rewards request data by status Pending, Approved and Rejected
const rewardsRequestByStatus = async (date) => {
    try {
        const initialDate = new Date(date);

        const units = [
            { unit: "week", periods: 3 },
            { unit: "month", periods: 3 },
            { unit: "quarter", periods: 3 },
            { unit: "annual", periods: 2 },
        ];

        const results = [];

        for (const { unit, periods } of units) {
            const unitResults = [];

            for (let i = 0; i < periods; i++) {
                const periodDate = new Date(initialDate);
                switch (unit) {
                    case "week":
                        periodDate.setDate(initialDate.getDate() - 7 * i);
                        break;
                    case "month":
                        periodDate.setMonth(initialDate.getMonth() - i);
                        break;
                    case "quarter":
                        periodDate.setMonth(initialDate.getMonth() - 3 * i);
                        break;
                    case "annual":
                        periodDate.setFullYear(initialDate.getFullYear() - i);
                        break;
                }

                const { startCurrent, endCurrent, startPrevious, endPrevious } =
                    getPeriodDates(unit, periodDate);

                const currentRewards = await Rewards.find({
                    status: "Ongoing",
                });

                // Use initialDate for i = 0, otherwise use endCurrent
                const periodEndDate = i === 0 ? initialDate : endCurrent;

                const currentStatusCounts = currentRewards.reduce(
                    (acc, reward) => {
                        reward.redeem.forEach((redeem) => {
                            const requestDate = new Date(redeem.requestDate);
                            if (
                                requestDate >= startCurrent &&
                                requestDate <= periodEndDate
                            ) {
                                acc.totalAmount += 1;
                                acc[redeem.status.toLowerCase()] += 1;
                            }
                        });
                        return acc;
                    },
                    { totalAmount: 0, pending: 0, approved: 0, rejected: 0 }
                );

                const previousStatusCounts = currentRewards.reduce(
                    (acc, reward) => {
                        reward.redeem.forEach((redeem) => {
                            const requestDate = new Date(redeem.requestDate);
                            if (
                                requestDate >= startPrevious &&
                                requestDate <= endPrevious
                            ) {
                                acc.totalAmount += 1;
                                acc[redeem.status.toLowerCase()] += 1;
                            }
                        });
                        return acc;
                    },
                    { totalAmount: 0, pending: 0, approved: 0, rejected: 0 }
                );

                const badgeCount =
                    currentStatusCounts.totalAmount -
                    previousStatusCounts.totalAmount;
                const pendingBadge =
                    currentStatusCounts.pending - previousStatusCounts.pending;
                const approvedBadge =
                    currentStatusCounts.approved -
                    previousStatusCounts.approved;
                const rejectedBadge =
                    currentStatusCounts.rejected -
                    previousStatusCounts.rejected;

                unitResults.push({
                    from: startCurrent.toISOString().split("T")[0],
                    to: endCurrent.toISOString().split("T")[0],
                    totalAmount: currentStatusCounts.totalAmount,
                    badgeCount,
                    statusCounts: {
                        pending: currentStatusCounts.pending,
                        pendingBadge,
                        approved: currentStatusCounts.approved,
                        approvedBadge,
                        rejected: currentStatusCounts.rejected,
                        rejectedBadge,
                    },
                });
            }

            results.push({
                filter: unit.charAt(0).toUpperCase() + unit.slice(1),
                info: unitResults,
            });
        }

        // Send the response with the calculated results
        return results;
    } catch (error) {
        console.error("Error fetching rewards data:", error);
        throw new Error(error.message);
    }
};

//Get All Surveys, and separate them by status Pending and Completed
// Fix this one.. its pending users to respond the survey and completed to answer?
const surveysManagementByStatus = async (date) => {
    try {
        const initialDate = new Date(date);

        // Define the time units and periods to analyze
        const units = [
            { unit: "week", periods: 3 },
            { unit: "month", periods: 3 },
            { unit: "quarter", periods: 3 },
            { unit: "annual", periods: 2 },
        ];

        const results = [];

        // Loop through each time unit (week, month, quarter, annual)
        for (const { unit, periods } of units) {
            const unitResults = [];

            // Loop through the number of periods for each unit
            for (let i = 0; i < periods; i++) {
                const periodDate = new Date(initialDate);
                switch (unit) {
                    case "week":
                        periodDate.setDate(initialDate.getDate() - 7 * i);
                        break;
                    case "month":
                        periodDate.setMonth(initialDate.getMonth() - i);
                        break;
                    case "quarter":
                        periodDate.setMonth(initialDate.getMonth() - 3 * i);
                        break;
                    case "annual":
                        periodDate.setFullYear(initialDate.getFullYear() - i);
                        break;
                }

                // Get the start and end dates for the current and previous periods
                const { startCurrent, endCurrent, startPrevious, endPrevious } =
                    getPeriodDates(unit, periodDate);

                // Use initialDate for i = 0, otherwise use endCurrent
                const periodEndDate = i === 0 ? initialDate : endCurrent;

                // Fetch all surveys from the database
                const currentSurveys = await Surveys.find({});

                // Calculate the status counts for the current period
                const currentStatusCounts = currentSurveys.reduce(
                    (acc, survey) => {
                        const surveyStartDate = new Date(survey.startDate);
                        const surveyEndDate = new Date(survey.endDate);

                        // Check if the survey is within the current period and update the counts
                        if (
                            survey.status === "Ongoing" &&
                            surveyEndDate <= periodEndDate
                        ) {
                            acc.ongoing += 1;
                            acc.totalAmount += 1;
                        }
                        if (
                            survey.status === "Upcoming" &&
                            surveyStartDate >= startCurrent
                        ) {
                            acc.upcoming += 1;
                            acc.totalAmount += 1;
                        }
                        return acc;
                    },
                    { totalAmount: 0, ongoing: 0, upcoming: 0 }
                );

                // Calculate the status counts for the previous period
                const previousStatusCounts = currentSurveys.reduce(
                    (acc, survey) => {
                        const surveyStartDate = new Date(survey.startDate);
                        const surveyEndDate = new Date(survey.endDate);

                        // Check if the survey is within the previous period and update the counts
                        if (
                            survey.status === "Ongoing" &&
                            surveyEndDate <= endPrevious
                        ) {
                            acc.ongoing += 1;
                            acc.totalAmount += 1;
                        }
                        if (
                            survey.status === "Upcoming" &&
                            surveyStartDate >= startPrevious
                        ) {
                            acc.upcoming += 1;
                            acc.totalAmount += 1;
                        }
                        return acc;
                    },
                    { totalAmount: 0, ongoing: 0, upcoming: 0 }
                );

                // Calculate the badge counts
                const badgeCount =
                    currentStatusCounts.totalAmount -
                    previousStatusCounts.totalAmount;
                const ongoingBadge =
                    currentStatusCounts.ongoing - previousStatusCounts.ongoing;
                const upcomingBadge =
                    currentStatusCounts.upcoming -
                    previousStatusCounts.upcoming;

                // Push the results for the current period to the unitResults array
                unitResults.push({
                    from: startCurrent.toISOString().split("T")[0],
                    to: endCurrent.toISOString().split("T")[0],
                    totalAmount: currentStatusCounts.totalAmount,
                    badgeCount,
                    statusCounts: {
                        ongoing: currentStatusCounts.ongoing,
                        ongoingBadge,
                        upcoming: currentStatusCounts.upcoming,
                        upcomingBadge,
                    },
                });
            }

            // Push the results for the current unit to the results array
            results.push({
                filter: unit.charAt(0).toUpperCase() + unit.slice(1),
                info: unitResults,
            });
        }

        // Send the response with the calculated results
        return results;
    } catch (error) {
        console.error("Error fetching surveys management data:", error);
        throw new Error(error.message);
    }
};

const satisfactionIndex = async (date) => {
    try {
        const initialDate = new Date(date); // Convert the date to a Date object

        // Define the time units and the number of periods to analyze
        const units = [
            { unit: "week", periods: 3 },
            { unit: "month", periods: 3 },
            { unit: "quarter", periods: 3 },
            { unit: "annual", periods: 2 },
        ];
        // Array to store results for each unit
        const results = [];

        // Get all users by calling the allUser function
        const users = await allUser();

        for (const { unit, periods } of units) {
            const unitResults = []; // Array to store results for each period in the current unit

            for (let i = 0; i < periods; i++) {
                const periodDate = new Date(initialDate);
                // Adjust periodDate based on the unit and period index
                switch (unit) {
                    case "week":
                        periodDate.setDate(initialDate.getDate() - 7 * i);
                        break;
                    case "month":
                        periodDate.setMonth(initialDate.getMonth() - i);
                        break;
                    case "quarter":
                        periodDate.setMonth(initialDate.getMonth() - 3 * i);
                        break;
                    case "annual":
                        periodDate.setFullYear(initialDate.getFullYear() - i);
                        break;
                }

                // Get the start and end dates of the current period
                const { startCurrent, endCurrent } = getPeriodDates(
                    unit,
                    periodDate
                );

                let totalEmployees = 0; // Counter for the total number of employees
                let totalEmployeesWithSurveys = 0; // Counter for the number of employees with at least one completed survey
                let totalSumOfAverages = 0; // Sum of users' averages
                let totalCompletedSurveys = 0; // Counter for the total number of completed surveys

                // Initialize the counters for each survey status
                const statusCounts = {
                    promoter: 0,
                    neutral: 0,
                    detractor: 0,
                };

                // Iterate over each user to analyze their surveys
                for (const user of users) {
                    const onBoardingDate = new Date(user.onBoardingDate);
                    const terminationDate = user.terminationDate
                        ? new Date(user.terminationDate)
                        : null;

                    // Use initialDate for i = 0, otherwise use endCurrent
                    const periodEndDate = i === 0 ? initialDate : endCurrent;

                    // Check if the user was onboarded before the end of the current period and either not terminated or terminated after the end of the current period
                    if (
                        onBoardingDate <= periodEndDate &&
                        (!terminationDate || terminationDate >= periodEndDate)
                    ) {
                        totalEmployees += 1; // Increment the employee counter

                        const completedSurveys = user.surveys.filter(
                            (survey) => {
                                const surveyDate = new Date(survey.date);
                                // Check if the survey was completed and is within the analyzed period
                                return (
                                    survey.status === "completed" &&
                                    surveyDate <= periodEndDate
                                );
                            }
                        );

                        if (completedSurveys.length > 0) {
                            totalEmployeesWithSurveys += 1; // Increment the counter for employees with at least one completed survey
                            let sumOfAverages = 0; // Sum of averages for the current user

                            // Calculate the average for each completed survey
                            completedSurveys.forEach((survey) => {
                                const average =
                                    survey.answers.reduce(
                                        (sum, answer) => sum + answer,
                                        0
                                    ) / survey.answers.length;
                                sumOfAverages += average;
                                console.log(
                                    `User: ${user.email}, Survey Date: ${survey.date}, Average: ${average}`
                                );
                            });

                            // Calculate the user's average across all completed surveys
                            const userAverage =
                                sumOfAverages / completedSurveys.length;

                            // Classify the user's average into Detractor, Neutral, or Promoter
                            if (userAverage >= 1.0 && userAverage < 2.0) {
                                statusCounts.detractor += 1;
                            } else if (
                                userAverage >= 2.0 &&
                                userAverage < 4.0
                            ) {
                                statusCounts.neutral += 1;
                            } else if (
                                userAverage >= 4.0 &&
                                userAverage <= 5.0
                            ) {
                                statusCounts.promoter += 1;
                            }

                            console.log(
                                `User: ${user.email}, User Average: ${userAverage}`
                            );
                            totalSumOfAverages += userAverage; // Add the user's average to the total sum of averages
                            totalCompletedSurveys += 1; // Increment the counter for completed surveys
                        }
                    }
                }

                // Calculate the total average of all users
                const totalAverage =
                    totalCompletedSurveys > 0
                        ? totalSumOfAverages / totalCompletedSurveys
                        : 0;
                console.log(
                    `Period: ${i}, Total Employees: ${totalEmployees}, Total Employees with Surveys: ${totalEmployeesWithSurveys}, Total Average: ${totalAverage}`
                );

                // Add the current period's results to the unit results array
                unitResults.push({
                    from: startCurrent.toISOString().split("T")[0],
                    to: endCurrent.toISOString().split("T")[0],
                    totalEmployees,
                    totalEmployeesWithSurveys,
                    totalAverage,
                    statusCounts: {
                        promoter:
                            totalEmployeesWithSurveys > 0
                                ? statusCounts.promoter /
                                  totalEmployeesWithSurveys
                                : 0,
                        neutral:
                            totalEmployeesWithSurveys > 0
                                ? statusCounts.neutral /
                                  totalEmployeesWithSurveys
                                : 0,
                        detractor:
                            totalEmployeesWithSurveys > 0
                                ? statusCounts.detractor /
                                  totalEmployeesWithSurveys
                                : 0,
                    },
                });
            }

            // Add the current unit's results to the overall results array
            results.push({
                filter: unit.charAt(0).toUpperCase() + unit.slice(1),
                info: unitResults,
            });
        }

        return results;
    } catch (error) {
        console.error("Error fetching satisfaction surveys data:", error);
        throw new Error(error.message);
    }
};

const averageScoreSurveys = async (date) => {
    try {
        console.log(date);
        const initialDate = new Date(date);

        // Define the units and periods for the analysis
        const units = [
            { unit: "week", periods: 3 },
            { unit: "month", periods: 3 },
            { unit: "quarter", periods: 3 },
            { unit: "annual", periods: 2 },
        ];

        const results = [];

        // Loop through each unit (week, month, quarter, annual)
        for (const { unit, periods } of units) {
            const unitResults = [];

            // Loop through each period within the unit
            for (let i = 0; i < periods; i++) {
                const periodDate = new Date(initialDate);
                // Adjust the period date based on the unit
                switch (unit) {
                    case "week":
                        periodDate.setDate(initialDate.getDate() - 7 * i);
                        break;
                    case "month":
                        periodDate.setMonth(initialDate.getMonth() - i);
                        break;
                    case "quarter":
                        periodDate.setMonth(initialDate.getMonth() - 3 * i);
                        break;
                    case "annual":
                        periodDate.setFullYear(initialDate.getFullYear() - i);
                        break;
                }

                // Get the start and end dates for the current and previous periods
                const { startCurrent, endCurrent, startPrevious, endPrevious } =
                    getPeriodDates(unit, periodDate);

                const periodEndDate = i === 0 ? initialDate : endCurrent;

                // Fetch all users
                const users = await User.find({});

                // Filter users active in the period
                const activeUsers = users.filter((user) => {
                    const onBoardingDate = new Date(user.onBoardingDate);
                    const terminationDate = user.terminationDate
                        ? new Date(user.terminationDate)
                        : null;
                    return (
                        onBoardingDate <= periodEndDate &&
                        (!terminationDate || terminationDate >= startCurrent)
                    );
                });

                // Calculate the average before the period
                const averageBeforePeriod = calculateAverageBeforePeriod(
                    activeUsers,
                    startCurrent
                );

                // Calculate the average within the period
                const periodAverages = calculatePeriodAverages(
                    activeUsers,
                    unit,
                    startCurrent,
                    periodEndDate,
                    averageBeforePeriod
                );

                // Generate labels for the unit
                const labels = generateLabels(unit, startCurrent, endCurrent);

                unitResults.push({
                    from: startCurrent.toISOString().split("T")[0],
                    to: endCurrent.toISOString().split("T")[0],
                    averages: periodAverages,
                    labels: labels,
                });
            }

            results.push({
                filter: unit.charAt(0).toUpperCase() + unit.slice(1),
                info: unitResults,
            });
        }

        return results;
    } catch (error) {
        console.error("Error fetching average score data:", error);
        throw new Error(error.message);
    }
};

// Calculate the average score before the period starts
const calculateAverageBeforePeriod = (users, startPeriod) => {
    let totalAnswers = 0;
    let totalCount = 0;

    users.forEach((user) => {
        user.surveys.forEach((survey) => {
            const surveyDate = new Date(survey.date);
            if (survey.status === "completed" && surveyDate < startPeriod) {
                totalAnswers += survey.answers.reduce(
                    (acc, val) => acc + val,
                    0
                );
                totalCount += survey.answers.length;
            }
        });
    });

    return totalCount ? totalAnswers / totalCount : null;
};

// Calculate the average score within the period
const calculatePeriodAverages = (
    users,
    unit,
    startPeriod,
    endPeriod,
    averageBeforePeriod
) => {
    const periodAverages = [];
    let currentPeriodStart = new Date(startPeriod);
    let lastAverage = averageBeforePeriod;

    if (unit === "quarter" || unit === "annual") {
        const numberOfPeriods = unit === "quarter" ? 3 : 4;
        for (let i = 0; i < numberOfPeriods; i++) {
            let periodStart = new Date(startPeriod);
            periodStart.setMonth(
                startPeriod.getMonth() + (unit === "quarter" ? i : i * 3)
            );
            let periodEnd = new Date(periodStart);
            periodEnd.setMonth(
                periodStart.getMonth() + (unit === "quarter" ? 1 : 3)
            );
            periodEnd.setDate(0);

            let totalAnswers = 0;
            let totalCount = 0;

            users.forEach((user) => {
                user.surveys.forEach((survey) => {
                    const surveyDate = new Date(survey.date);
                    if (
                        survey.status === "completed" &&
                        surveyDate >= periodStart &&
                        surveyDate <= periodEnd
                    ) {
                        totalAnswers += survey.answers.reduce(
                            (acc, val) => acc + val,
                            0
                        );
                        totalCount += survey.answers.length;
                    }
                });
            });

            const averageForCurrentPeriod = totalCount
                ? totalAnswers / totalCount
                : null;
            lastAverage = calculateCombinedAverage(
                lastAverage,
                averageForCurrentPeriod
            );
            periodAverages.push(lastAverage);

            if (
                periodEnd.getMonth() >= endPeriod.getMonth() &&
                periodEnd.getFullYear() === endPeriod.getFullYear()
            ) {
                break;
            }
        }
    } else {
        const timeUnitIncrements = {
            week: 1,
            month: 7,
            quarter: 1,
            annual: 3,
        };

        const increment = timeUnitIncrements[unit];

        while (currentPeriodStart <= endPeriod) {
            let currentPeriodEnd = new Date(currentPeriodStart);
            currentPeriodEnd.setDate(currentPeriodEnd.getDate() + increment);

            let totalAnswers = 0;
            let totalCount = 0;

            users.forEach((user) => {
                user.surveys.forEach((survey) => {
                    const surveyDate = new Date(survey.date);
                    if (
                        survey.status === "completed" &&
                        surveyDate >= currentPeriodStart &&
                        surveyDate < currentPeriodEnd
                    ) {
                        totalAnswers += survey.answers.reduce(
                            (acc, val) => acc + val,
                            0
                        );
                        totalCount += survey.answers.length;
                    }
                });
            });

            const averageForCurrentPeriod = totalCount
                ? totalAnswers / totalCount
                : null;
            lastAverage = calculateCombinedAverage(
                lastAverage,
                averageForCurrentPeriod
            );
            periodAverages.push(lastAverage);

            currentPeriodStart.setDate(
                currentPeriodStart.getDate() + increment
            );
        }

        const expectedLength = unit === "week" ? 7 : unit === "month" ? 4 : 4;
        while (periodAverages.length < expectedLength) {
            periodAverages.push(null);
        }
    }

    return periodAverages;
};

// Calculate the combined average of the last and current periods
const calculateCombinedAverage = (lastAverage, currentAverage) => {
    if (lastAverage === null) {
        return currentAverage;
    } else if (currentAverage === null) {
        return lastAverage;
    } else {
        return (lastAverage + currentAverage) / 2;
    }
};

// Generate labels for the periods based on the unit
const generateLabels = (unit, start, end) => {
    const labels = [];
    let currentDate = new Date(start);
    currentDate.setHours(31);

    switch (unit) {
        case "week":
            while (currentDate <= end) {
                labels.push(currentDate.getDate());
                currentDate.setDate(currentDate.getDate() + 1);
            }
            break;
        case "month":
            labels.push("week1", "week2", "week3", "week4");
            break;
        case "quarter":
            for (let i = 0; i < 3; i++) {
                const monthName = currentDate.toLocaleString("default", {
                    month: "short",
                });
                labels.push(monthName);
                currentDate.setMonth(currentDate.getMonth() + 1);
            }
            break;
        case "annual":
            labels.push("Q1", "Q2", "Q3", "Q4");
            break;
    }

    return labels;
};

// EXPORTS =======================================================================
module.exports = {
    getDashboardCharts,
    getRecognitionsByStatus,
    getRecognitionByCategory,
    getRewardsRequestByStatus,
    getRewardsManagementByStatus,
    getSurveysManagementByStatus,
    getSatisfactionIndex,
    getAverageScore,
    //HELPERS to call in another endpoint
    recognitionsByStatus,
    recognitionByCategory,
    rewardsManagementByStatus,
    rewardsRequestByStatus,
    surveysManagementByStatus,
    satisfactionIndex,
    averageScoreSurveys,
};
