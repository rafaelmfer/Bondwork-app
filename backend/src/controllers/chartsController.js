const Recognition = require("../models/RecognitionModel");
const Rewards = require("../models/RewardsModel");
const Surveys = require("../models/SurveyModel");
const User = require("../models/UserModel");

const { getPeriodDates } = require("../utils/utils");

const { allUser } = require("./userController");

const getRecognitionsByStatus = async (req, res) => {
    try {
        const { date } = req.body;
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

        res.status(200).json(results);
    } catch (error) {
        console.error("Error fetching recognition data:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getRewardsManagementByStatus = async (req, res) => {
    try {
        const { date } = req.body;
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

        res.status(200).json(results);
    } catch (error) {
        console.error("Error fetching rewards management data:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getRewardsRequestByStatus = async (req, res) => {
    try {
        const { date } = req.body;
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

        res.status(200).json(results);
    } catch (error) {
        console.error("Error fetching recognition data:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Fix this one.. its pending users to respond the survey and completed to answer?
const getSurveysManagementByStatus = async (req, res) => {
    try {
        const { date } = req.body;
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
                            surveyEndDate <= endCurrent
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
        res.status(200).json(results);
    } catch (error) {
        console.error("Error fetching surveys management data:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getSatisfactionIndex = async (req, res) => {
    try {
        const { date } = req.body; // Extract the date from the request body
        const initialDate = new Date(date); // Convert the date to a Date object

        const units = [
            { unit: "week", periods: 3 },
            { unit: "month", periods: 3 },
            { unit: "quarter", periods: 3 },
            { unit: "annual", periods: 2 },
        ]; // Define the time units and the number of periods to analyze

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

        // Send the final results as a JSON response
        res.status(200).json(results);
    } catch (error) {
        console.error("Error fetching satisfaction surveys data:", error); // Log errors
        res.status(500).json({ message: "Server error" }); // Send an error response
    }
};

// IT DOENST WORK YET
const getSatisfactionIndexByDay = async (req, res) => {
    try {
        const { date } = req.body;
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

                const { startCurrent, endCurrent } = getPeriodDates(
                    unit,
                    periodDate
                );

                // Use initialDate for i = 0, otherwise use endCurrent
                const periodEndDate = i === 0 ? initialDate : endCurrent;

                // Calculate total employees in the period
                const users = await User.find({});
                const totalEmployees = users.filter((user) => {
                    const onBoardingDate = new Date(user.onBoardingDate);
                    const terminationDate = user.terminationDate
                        ? new Date(user.terminationDate)
                        : null;
                    if (i === 0) {
                        return (
                            onBoardingDate <= endCurrent &&
                            (!terminationDate || terminationDate >= endCurrent)
                        );
                    }
                    return (
                        onBoardingDate <= periodEndDate &&
                        (!terminationDate || terminationDate >= periodEndDate)
                    );
                });

                let totalEmployeesWithSurveys = 0;
                const weeklyTotals = {};

                // Calculate weekly satisfaction indices
                totalEmployees.forEach((user) => {
                    const completedSurveys = user.surveys.filter((survey) => {
                        const surveyDate = new Date(survey.date);
                        return (
                            survey.status === "completed" &&
                            surveyDate <= periodEndDate
                        );
                    });

                    if (completedSurveys.length > 0) {
                        totalEmployeesWithSurveys += 1;
                        completedSurveys.forEach((survey) => {
                            const surveyWeek = getISOWeek(
                                new Date(survey.date)
                            );
                            if (!weeklyTotals[surveyWeek]) {
                                weeklyTotals[surveyWeek] = { sum: 0, count: 0 };
                            }
                            const averageAnswer =
                                survey.answers.reduce((a, b) => a + b, 0) /
                                survey.answers.length;
                            weeklyTotals[surveyWeek].sum += averageAnswer;
                            weeklyTotals[surveyWeek].count += 1;
                        });
                    }
                });

                const totalAverage = [];
                let cumulativeSum = 0;
                let cumulativeCount = 0;

                if (unit === "week") {
                    for (
                        let d = new Date(startCurrent);
                        d <= endCurrent;
                        d.setDate(d.getDate() + 1)
                    ) {
                        const dayStr = d.toISOString().split("T")[0];
                        if (weeklyTotals[getISOWeek(d)]) {
                            cumulativeSum += weeklyTotals[getISOWeek(d)].sum;
                            cumulativeCount +=
                                weeklyTotals[getISOWeek(d)].count;
                        }
                        if (cumulativeCount > 0) {
                            totalAverage.push(cumulativeSum / cumulativeCount);
                        } else {
                            totalAverage.push(0);
                        }
                    }
                } else if (unit === "month") {
                    const weeksInMonth = getWeeksInMonth(
                        initialDate.getMonth() - i,
                        initialDate.getFullYear()
                    );
                    for (let w = 1; w <= weeksInMonth; w++) {
                        const weekAverage = weeklyTotals[w]
                            ? weeklyTotals[w].sum / weeklyTotals[w].count
                            : 0;
                        totalAverage.push(weekAverage);
                    }
                } else if (unit === "quarter") {
                    const monthsInQuarter = getMonthsInQuarter(
                        initialDate.getMonth() - 3 * i,
                        initialDate.getFullYear()
                    );
                    for (let m = 1; m <= monthsInQuarter; m++) {
                        const monthAverage = calculateMonthAverage(
                            weeklyTotals,
                            initialDate.getMonth() - 3 * i + m,
                            initialDate.getFullYear()
                        );
                        totalAverage.push(monthAverage);
                    }
                } else if (unit === "annual") {
                    const quartersInYear = 4;
                    for (let q = 1; q <= quartersInYear; q++) {
                        const quarterAverage = calculateQuarterAverage(
                            weeklyTotals,
                            initialDate.getFullYear() - i,
                            q
                        );
                        totalAverage.push(quarterAverage);
                    }
                }

                unitResults.push({
                    from: startCurrent.toISOString().split("T")[0],
                    to: endCurrent.toISOString().split("T")[0],
                    totalEmployees: totalEmployees.length,
                    totalEmployeesWithSurveys,
                    totalAverage,
                });
            }

            results.push({
                filter: unit.charAt(0).toUpperCase() + unit.slice(1),
                info: unitResults,
            });
        }

        res.status(200).json(results);
    } catch (error) {
        console.error("Error fetching satisfaction index data:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Função para obter o número da semana ISO
function getISOWeek(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

// Função para obter o número de semanas em um mês específico
function getWeeksInMonth(month, year) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const used = firstDay.getDay() + lastDay.getDate();
    return Math.ceil(used / 7);
}

// Função para calcular a média do mês com base nas semanas
function calculateMonthAverage(weeklyTotals, month, year) {
    let sum = 0;
    let count = 0;
    const weeksInMonth = getWeeksInMonth(month, year);
    for (let w = 1; w <= weeksInMonth; w++) {
        if (weeklyTotals[w]) {
            sum += weeklyTotals[w].sum;
            count += weeklyTotals[w].count;
        }
    }
    return count > 0 ? sum / count : 0;
}

// Função para obter o número de meses em um trimestre específico
function getMonthsInQuarter(quarterStartMonth, year) {
    return quarterStartMonth < 0 ? 0 : Math.min(3, 11 - quarterStartMonth) + 1;
}

// Função para calcular a média do trimestre com base nos meses
function calculateQuarterAverage(weeklyTotals, year, quarter) {
    let sum = 0;
    let count = 0;
    const monthsInQuarter = getMonthsInQuarter((quarter - 1) * 3, year);
    for (let m = 1; m <= monthsInQuarter; m++) {
        sum += calculateMonthAverage(weeklyTotals, (quarter - 1) * 3 + m, year);
        count++;
    }
    return count > 0 ? sum / count : 0;
}

module.exports = {
    getRecognitionsByStatus,
    getRewardsRequestByStatus,
    getRewardsManagementByStatus,
    getSurveysManagementByStatus,
    getSatisfactionIndex,
    getSatisfactionIndexByDay,
};
