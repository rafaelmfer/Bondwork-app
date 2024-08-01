const Recognition = require("../models/RecognitionModel");
const Rewards = require("../models/RewardsModel");
const Surveys = require("../models/SurveyModel");
const User = require("../models/UserModel");
const moment = require("moment");

const { getPeriodDates } = require("../utils/utils");

const { allUser } = require("./userController");

// CHARTS by PAGES
const getDashboardCharts = async (req, res) => {
    try {
        const { date } = req.body;

        const [chart1, chart2, chart3, chart4] = await Promise.all([
            turnoverRate(date),
            scoreCategoriesSurveys(true),
            recognitionsByStatus(date),
            rewardsRequestByStatus(date),
        ]);

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

const getRecognitionsCharts = async (req, res) => {
    try {
        const { date } = req.body;

        const [chart1, chart2] = await Promise.all([
            recognitionsByStatus(date),
            recognitionByCategory(date),
        ]);

        res.status(200).json({
            chart1,
            chart2,
        });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getRewardsCharts = async (req, res) => {
    try {
        const { date } = req.body;

        const [chart1, chart2] = await Promise.all([
            rewardsManagementByStatus(date),
            rewardsRequestByStatus(date),
        ]);

        res.status(200).json({
            chart1,
            chart2,
        });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getSurveysCharts = async (req, res) => {
    try {
        const { date } = req.body;

        const [chart1, chart2, chart3, chart4] = await Promise.all([
            surveysManagementByStatus(date),
            satisfactionIndex(date),
            averageScoreSurveys(date),
            scoreCategoriesSurveys(false),
        ]);

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

// CHARTS
const getTurnoverRate = async (req, res) => {
    try {
        const { date } = req.body;
        const results = await turnoverRate(date);

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
        const results = await rewardsRequestByStatus(date);

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
const turnoverRate = async (date) => {
    try {
        const requestDate = moment(date);
        const getWeekResults = async (date) => {
            const requestDate = date.clone();

            const calculateWeeklyResults = async (
                startOfWeek,
                includeFutureDays = false
            ) => {
                const values = [];
                const labels = [];
                const weekResults = [];
                const dailyTurnoverRates = [];
                const dailyDifferences = [];

                for (let i = 0; i < 7; i++) {
                    const day = startOfWeek.clone().add(i, "days");
                    const from = day.format("YYYY-MM-DD");
                    const to = day.format("YYYY-MM-DD");

                    let turnoverRate = null;
                    if (
                        includeFutureDays ||
                        day.isSameOrBefore(requestDate, "day")
                    ) {
                        turnoverRate = parseFloat(
                            await calculateTurnoverRate(from, to)
                        );
                    }

                    values.push(turnoverRate);
                    labels.push(day.date().toString());
                    weekResults.push({ from, to, turnoverRate });
                    dailyTurnoverRates.push(turnoverRate);
                }

                dailyDifferences.push("0.00"); // First day difference set to 0.00
                for (let i = 1; i < dailyTurnoverRates.length; i++) {
                    const difference =
                        dailyTurnoverRates[i] !== null &&
                        dailyTurnoverRates[i - 1] !== null
                            ? (
                                  dailyTurnoverRates[i] -
                                  dailyTurnoverRates[i - 1]
                              ).toFixed(2)
                            : null;
                    dailyDifferences.push(difference);
                }

                const weekTurnoverRate = parseFloat(
                    await calculateTurnoverRate(
                        startOfWeek.format("YYYY-MM-DD"),
                        startOfWeek.clone().add(6, "days").format("YYYY-MM-DD")
                    )
                ).toFixed(2);

                return {
                    weekTurnoverRate,
                    weekResults,
                    values,
                    labels,
                    dailyTurnoverRates,
                    dailyDifferences,
                };
            };

            const weekStartDates = [
                date.startOf("isoWeek"),
                date.clone().subtract(1, "week").startOf("isoWeek"),
                date.clone().subtract(2, "weeks").startOf("isoWeek"),
            ];

            const [currentWeek, previousWeek, weekBeforePreviousWeek] =
                await Promise.all(
                    weekStartDates.map((startOfWeek, index) =>
                        calculateWeeklyResults(startOfWeek, index > 0)
                    )
                );

            const badges = [
                currentWeek.dailyDifferences.map((diff, idx) =>
                    idx < requestDate.day() ? diff : "null"
                ),
                previousWeek.dailyDifferences,
                weekBeforePreviousWeek.dailyDifferences,
            ];

            // Calculate the turnover rate for the current week and the previous week for currentBadge
            const currentWeekTurnoverRate = currentWeek.weekTurnoverRate;
            const previousWeekTurnoverRate = previousWeek.weekTurnoverRate;
            const currentBadge = (
                currentWeekTurnoverRate - previousWeekTurnoverRate
            ).toFixed(2);

            const results = [
                {
                    from: weekStartDates[0].format("YYYY-MM-DD"),
                    to: weekStartDates[0]
                        .clone()
                        .add(6, "days")
                        .format("YYYY-MM-DD"),
                    current: currentWeekTurnoverRate,
                    currentBadge: currentBadge,
                    badge: badges[0],
                    value: currentWeek.values,
                    labels: currentWeek.labels,
                },
            ];

            return {
                filter: "Week",
                info: results,
            };
        };

        const calculateTurnoverRateForDay = async (date) => {
            const from = date.format("YYYY-MM-DD");
            const to = date.format("YYYY-MM-DD");
            return parseFloat(await calculateTurnoverRate(from, to)).toFixed(2);
        };

        const getMonthResults = async (date) => {
            const requestDate = date.clone();
            const monthStart = requestDate.clone().startOf("month");
            const monthEnd = requestDate.clone().endOf("month");
            const monthResults = [];
            const values = [];
            const labels = [];
            const badges = [];

            let weekStart = monthStart.clone();
            let lastWeekTurnoverRate = null;

            // Calculate the turnover rate for the request month
            const requestMonthStart = monthStart.format("YYYY-MM-DD");
            const requestMonthEnd = monthEnd.format("YYYY-MM-DD");
            const requestMonthTurnoverRate = await calculateTurnoverRate(
                requestMonthStart,
                requestMonthEnd
            );
            const formattedRequestMonthTurnoverRate = parseFloat(
                requestMonthTurnoverRate
            ).toFixed(2);

            // Calculate the turnover rate for the previous month
            const previousMonthStart = monthStart
                .clone()
                .subtract(1, "month")
                .startOf("month")
                .format("YYYY-MM-DD");
            const previousMonthEnd = monthStart
                .clone()
                .subtract(1, "month")
                .endOf("month")
                .format("YYYY-MM-DD");
            const previousMonthTurnoverRate = await calculateTurnoverRate(
                previousMonthStart,
                previousMonthEnd
            );
            const formattedPreviousMonthTurnoverRate = parseFloat(
                previousMonthTurnoverRate
            ).toFixed(2);

            // Calculate the current badge by comparing the current month to the previous month
            const currentBadge = (
                formattedRequestMonthTurnoverRate -
                formattedPreviousMonthTurnoverRate
            ).toFixed(2);

            while (weekStart.isBefore(monthEnd)) {
                const from = weekStart.clone().format("YYYY-MM-DD");
                const to = moment
                    .min(weekStart.clone().add(6, "days"), monthEnd)
                    .format("YYYY-MM-DD");

                let turnoverRate = await calculateTurnoverRate(from, to);
                turnoverRate = parseFloat(turnoverRate).toFixed(2);

                values.push(parseFloat(turnoverRate));

                if (lastWeekTurnoverRate !== null) {
                    badges.push(
                        (
                            parseFloat(turnoverRate) -
                            parseFloat(lastWeekTurnoverRate)
                        ).toFixed(2)
                    );
                } else {
                    // For the first week of the month, compare with the last week of the previous month
                    const lastWeekFrom = weekStart
                        .clone()
                        .subtract(7, "days")
                        .format("YYYY-MM-DD");
                    const lastWeekTo = weekStart
                        .clone()
                        .subtract(1, "day")
                        .format("YYYY-MM-DD");

                    let lastWeekRate = await calculateTurnoverRate(
                        lastWeekFrom,
                        lastWeekTo
                    );
                    lastWeekRate = parseFloat(lastWeekRate).toFixed(2);
                    badges.push(
                        (
                            parseFloat(turnoverRate) - parseFloat(lastWeekRate)
                        ).toFixed(2)
                    );
                }

                labels.push(`week${monthResults.length + 1}`);
                lastWeekTurnoverRate = turnoverRate;

                // Check if the current week contains the requestDate
                if (
                    weekStart.isSameOrBefore(requestDate) &&
                    moment(to).isSameOrAfter(requestDate)
                ) {
                    current = turnoverRate;
                }

                monthResults.push({
                    from,
                    to,
                    turnoverRate,
                    badge: badges[badges.length - 1],
                });

                weekStart.add(7, "days");
            }

            return {
                filter: "Month",
                info: [
                    {
                        from: monthStart.format("YYYY-MM-DD"),
                        to: monthEnd.format("YYYY-MM-DD"),
                        current: formattedRequestMonthTurnoverRate, // Always show the turnover rate of the request month
                        currentBadge: currentBadge, // Compare turnover rate of current month to previous month
                        badge: badges, // Compare turnover rate of week to previous week in the month
                        value: values,
                        labels: labels,
                    },
                ],
            };
        };

        const getQuarterResults = async (date) => {
            // Determine the quarter of the request date
            const quarter = Math.floor((date.month() + 3) / 3);
            const quarterStart = date
                .clone()
                .quarter(quarter)
                .startOf("quarter");
            const quarterEnd = date.clone().quarter(quarter).endOf("quarter");

            let currentMonth = quarterStart.clone();
            let previousMonthTurnoverRate = null;
            let quarterTurnoverRateSum = 0;
            let monthsCount = 0;

            const badges = [];
            const values = [];
            const labels = [];

            // Calculate the turnover rate for the month containing the request date
            const requestMonthStart = date
                .clone()
                .startOf("month")
                .format("YYYY-MM-DD");
            const requestMonthEnd = date
                .clone()
                .endOf("month")
                .format("YYYY-MM-DD");
            const requestMonthTurnoverRate = await calculateTurnoverRate(
                requestMonthStart,
                requestMonthEnd
            );
            const formattedRequestMonthTurnoverRate = parseFloat(
                requestMonthTurnoverRate
            ).toFixed(2);

            // Calculate the turnover rate for the current quarter
            const currentQuarterTurnoverRate = await calculateTurnoverRate(
                quarterStart.format("YYYY-MM-DD"),
                quarterEnd.format("YYYY-MM-DD")
            );
            const formattedCurrentQuarterTurnoverRate = parseFloat(
                currentQuarterTurnoverRate
            ).toFixed(2);

            // Calculate the turnover rate for the previous quarter
            const previousQuarterStart = quarterStart
                .clone()
                .subtract(3, "months")
                .startOf("quarter")
                .format("YYYY-MM-DD");
            const previousQuarterEnd = quarterStart
                .clone()
                .subtract(3, "months")
                .endOf("quarter")
                .format("YYYY-MM-DD");
            const previousQuarterTurnoverRate = await calculateTurnoverRate(
                previousQuarterStart,
                previousQuarterEnd
            );
            const formattedPreviousQuarterTurnoverRate = parseFloat(
                previousQuarterTurnoverRate
            ).toFixed(2);

            // Calculate the current badge by comparing the current quarter to the previous quarter
            const currentBadge = (
                formattedCurrentQuarterTurnoverRate -
                formattedPreviousQuarterTurnoverRate
            ).toFixed(2);

            // Get the turnover rate for the month before the quarter starts, if it exists
            const previousMonthStart = quarterStart
                .clone()
                .subtract(1, "month")
                .startOf("month")
                .format("YYYY-MM-DD");
            const previousMonthEnd = quarterStart
                .clone()
                .subtract(1, "month")
                .endOf("month")
                .format("YYYY-MM-DD");
            previousMonthTurnoverRate = await calculateTurnoverRate(
                previousMonthStart,
                previousMonthEnd
            );
            previousMonthTurnoverRate = parseFloat(
                previousMonthTurnoverRate
            ).toFixed(2);

            while (currentMonth.isSameOrBefore(quarterEnd, "month")) {
                const monthStart = currentMonth
                    .startOf("month")
                    .format("YYYY-MM-DD");
                const monthEnd = currentMonth
                    .endOf("month")
                    .format("YYYY-MM-DD");

                let turnoverRate = null;
                if (currentMonth.isSameOrBefore(date, "month")) {
                    const effectiveMonthEnd = currentMonth.isSame(date, "month")
                        ? date.format("YYYY-MM-DD")
                        : monthEnd;
                    turnoverRate = await calculateTurnoverRate(
                        monthStart,
                        effectiveMonthEnd
                    );
                    turnoverRate = parseFloat(turnoverRate).toFixed(2);
                }

                let badge = null;
                if (
                    previousMonthTurnoverRate !== null &&
                    turnoverRate !== null
                ) {
                    badge = (turnoverRate - previousMonthTurnoverRate).toFixed(
                        2
                    );
                }

                if (turnoverRate !== null) {
                    quarterTurnoverRateSum += parseFloat(turnoverRate);
                    monthsCount++;
                }

                badges.push(badge);
                values.push(turnoverRate);
                labels.push(currentMonth.format("MMMM"));

                previousMonthTurnoverRate = turnoverRate;
                currentMonth.add(1, "month");
            }

            return {
                filter: "Quarter",
                info: [
                    {
                        from: quarterStart.format("YYYY-MM-DD"),
                        to: quarterEnd.format("YYYY-MM-DD"),
                        current: formattedCurrentQuarterTurnoverRate, // Always show the turnover rate of the request quarter
                        currentBadge: currentBadge, // Compare turnover rate of current quarter to previous quarter
                        badge: badges, // Compare turnover rate of month to previous month in the quarter
                        value: values,
                        labels: labels,
                    },
                ],
            };
        };

        const getAnnualResults = async (date) => {
            const yearStart = date.clone().startOf("year");
            const yearEnd = date.clone().endOf("year");

            let quarterStart = yearStart.clone();
            let previousQuarterTurnoverRate = null;
            let totalTurnoverRateSum = 0;
            let quartersCount = 0;

            const badges = [];
            const values = [];
            const labels = [];

            // Calculate the turnover rate for the quarter containing the request date
            const requestQuarterStart = date
                .clone()
                .startOf("quarter")
                .format("YYYY-MM-DD");
            const requestQuarterEnd = date
                .clone()
                .endOf("quarter")
                .format("YYYY-MM-DD");
            const requestQuarterTurnoverRate = await calculateTurnoverRate(
                requestQuarterStart,
                requestQuarterEnd
            );

            // Calculate the turnover rate for the current year
            const currentYearTurnoverRate = await calculateTurnoverRate(
                yearStart.format("YYYY-MM-DD"),
                yearEnd.format("YYYY-MM-DD")
            );
            const formattedCurrentYearTurnoverRate = parseFloat(
                currentYearTurnoverRate
            ).toFixed(2);

            // Calculate the turnover rate for the previous year
            const previousYearStart = yearStart
                .clone()
                .subtract(1, "year")
                .startOf("year")
                .format("YYYY-MM-DD");
            const previousYearEnd = yearStart
                .clone()
                .subtract(1, "year")
                .endOf("year")
                .format("YYYY-MM-DD");
            const previousYearTurnoverRate = await calculateTurnoverRate(
                previousYearStart,
                previousYearEnd
            );
            const formattedPreviousYearTurnoverRate = parseFloat(
                previousYearTurnoverRate
            ).toFixed(2);

            // Calculate the current badge
            const currentBadge = (
                formattedCurrentYearTurnoverRate -
                formattedPreviousYearTurnoverRate
            ).toFixed(2);

            while (quarterStart.isSameOrBefore(yearEnd, "quarter")) {
                const from = quarterStart
                    .startOf("quarter")
                    .format("YYYY-MM-DD");
                const to = quarterStart.endOf("quarter").format("YYYY-MM-DD");

                let turnoverRate = null;
                if (quarterStart.isSameOrBefore(date, "quarter")) {
                    const effectiveQuarterEnd = quarterStart.isSame(
                        date,
                        "quarter"
                    )
                        ? date.format("YYYY-MM-DD")
                        : to;
                    turnoverRate = await calculateTurnoverRate(
                        from,
                        effectiveQuarterEnd
                    );
                    turnoverRate = parseFloat(turnoverRate).toFixed(2);

                    // Store the turnover rate if it's the quarter containing the request date
                    if (quarterStart.isSame(date, "quarter")) {
                        currentQuarterTurnoverRate = turnoverRate;
                    }
                }

                let badge = null;
                if (quarterStart.isSameOrBefore(date, "quarter")) {
                    if (
                        previousQuarterTurnoverRate !== null &&
                        turnoverRate !== null
                    ) {
                        badge = (
                            turnoverRate - previousQuarterTurnoverRate
                        ).toFixed(2);
                    } else if (previousQuarterTurnoverRate === null) {
                        // Calculate the turnover rate for the quarter before the first quarter
                        const previousQuarterStart = quarterStart
                            .clone()
                            .subtract(3, "months")
                            .startOf("quarter")
                            .format("YYYY-MM-DD");
                        const previousQuarterEnd = quarterStart
                            .clone()
                            .subtract(3, "months")
                            .endOf("quarter")
                            .format("YYYY-MM-DD");
                        previousQuarterTurnoverRate =
                            await calculateTurnoverRate(
                                previousQuarterStart,
                                previousQuarterEnd
                            );
                        previousQuarterTurnoverRate = parseFloat(
                            previousQuarterTurnoverRate
                        ).toFixed(2);
                        badge = (
                            turnoverRate - previousQuarterTurnoverRate
                        ).toFixed(2);
                    }
                } else {
                    // Set turnoverRate and badge to null if the quarter is after the request quarter
                    turnoverRate = null;
                    badge = null;
                }

                if (turnoverRate !== null) {
                    totalTurnoverRateSum += parseFloat(turnoverRate);
                    quartersCount++;
                }

                badges.push(badge);
                values.push(turnoverRate != null ? Number(turnoverRate) : null);
                labels.push(`Q${Math.floor((quarterStart.month() + 3) / 3)}`);

                previousQuarterTurnoverRate = turnoverRate;
                quarterStart.add(3, "months");
            }

            return {
                filter: "Annual",
                info: [
                    {
                        from: yearStart.format("YYYY-MM-DD"),
                        to: yearEnd.format("YYYY-MM-DD"),
                        current: formattedCurrentYearTurnoverRate, // Show the turnover rate of the current year
                        currentBadge: currentBadge, // Compare turnover rate of current year to previous year
                        badge: badges, // Compare turnover rate of quarter to previous quarter in the year
                        value: values,
                        labels: labels,
                    },
                ],
            };
        };

        const calculateTurnoverRate = async (start, end) => {
            const totalEmployees = await User.countDocuments({
                onBoardingDate: { $lte: end },
            });

            const terminatedEmployees = await User.countDocuments({
                terminationDate: { $gte: start, $lte: end },
            });

            if (totalEmployees === 0) return "0.00";
            const turnoverRate = (
                (terminatedEmployees / totalEmployees) *
                100
            ).toFixed(2);
            return `${turnoverRate}`;
        };

        // Get results for each time period
        const weekResults = await getWeekResults(requestDate);
        const monthResults = await getMonthResults(requestDate);
        const quarterResults = await getQuarterResults(requestDate);
        const annualResults = await getAnnualResults(requestDate);

        let results = [];
        results.push(weekResults);
        results.push(monthResults);
        results.push(quarterResults);
        results.push(annualResults);

        return results;
    } catch (error) {
        console.error("Error fetching turnover rate data:", error);
        throw new Error(error.message);
    }
};

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
                            surveyEndDate >= periodEndDate
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
                const totalAverage = Number(
                    totalCompletedSurveys > 0
                        ? totalSumOfAverages / totalCompletedSurveys
                        : 0
                ).toFixed(1);
                // console.log(
                //     `Period: ${i}, Total Employees: ${totalEmployees}, Total Employees with Surveys: ${totalEmployeesWithSurveys}, Total Average: ${totalAverage}`
                // );

                let promoterPercent =
                    totalEmployeesWithSurveys > 0
                        ? statusCounts.promoter / totalEmployeesWithSurveys
                        : 0;
                let neutralPercent =
                    totalEmployeesWithSurveys > 0
                        ? statusCounts.neutral / totalEmployeesWithSurveys
                        : 0;
                let detractorPercent =
                    totalEmployeesWithSurveys > 0
                        ? statusCounts.detractor / totalEmployeesWithSurveys
                        : 0;

                console.log(statusCounts.promoter);
                console.log(statusCounts.neutral);
                console.log(statusCounts.detractor);

                // Add the current period's results to the unit results array
                unitResults.push({
                    from: startCurrent.toISOString().split("T")[0],
                    to: endCurrent.toISOString().split("T")[0],
                    totalEmployees,
                    totalEmployeesWithSurveys,
                    totalAverage,
                    percentages: [
                        Number((promoterPercent * 5).toFixed(2)),
                        Number((neutralPercent * 5).toFixed(2)),
                        Number((detractorPercent * 5).toFixed(2)),
                    ],
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

const scoreCategoriesSurveys = async (hasOverall) => {
    try {
        const results = [];
        const unitResults = [];

        let weekAverage = [
            [2.9, 2, 2.7, 3.5, 3.3, 4.5, null],
            [2, 2.3, 2.5, 3, 4.5, 4.1, null],
            [4.2, 3.2, 4.7, 2.6, 2.5, 3.1, null],
            [3.6, 3.6, 2.9, 4.3, 4.3, 2.3, null],
        ];
        let monthAverage = [
            [3, 2.5, 2.7, 3.3],
            [3, 4.5, 4.1, 4.5],
            [4.7, 2.6, 3.1, 3.7],
            [3.6, 2.9, 3.8, 3.4],
        ];
        let quarterAverage = [
            [2, 2.5, null],
            [3, 3.5, null],
            [3.7, 3.3, null],
            [2.6, 3.2, null],
        ];
        let annualAverage = [
            [2.1, 2.5, 2.9],
            [1.5, 2.7, 3.8],
            [3.2, 3.3, 3.3],
            [2.6, 2.9, 4.2],
        ];

        let currentDayOverall = 0;
        let lastDayOverall = 0;
        let currentWeekOverall = 0;
        let lastWeekOverall = 0;
        let currentMonthOverall = 0;
        let lastMonthOverall = 0;
        let currentQuarterOverall = 0;
        let lastQuarterOverall = 0;

        if (hasOverall) {
            const calculateAverage = (values) => {
                const validValues = values.filter((value) => value !== null);
                const sum = validValues.reduce((acc, value) => acc + value, 0);
                return validValues.length
                    ? Number((sum / validValues.length).toFixed(2))
                    : null;
            };

            const calculateOverallAverage = (dataArray) => {
                const maxLength = Math.max(
                    ...dataArray.map((arr) => arr.length)
                );
                return Array.from({ length: maxLength }, (_, index) =>
                    calculateAverage(dataArray.map((array) => array[index]))
                );
            };

            const getCurrentAndLastOverall = (averageArray) => {
                const currentOverall =
                    averageArray[averageArray.length - 1] ??
                    averageArray[averageArray.length - 2];
                const lastOverall = averageArray[averageArray.length - 1]
                    ? averageArray[averageArray.length - 2]
                    : averageArray[averageArray.length - 3];
                return {
                    currentOverall,
                    lastOverall: Number(
                        (currentOverall - lastOverall).toFixed(2)
                    ),
                };
            };

            // Average for every period
            const weekOverallAverage = calculateOverallAverage(weekAverage);
            const monthOverallAverage = calculateOverallAverage(monthAverage);
            const quarterOverallAverage =
                calculateOverallAverage(quarterAverage);
            const annualOverallAverage = calculateOverallAverage(annualAverage);

            // Add Overall array in first position of the array
            weekAverage.unshift(weekOverallAverage);
            monthAverage.unshift(monthOverallAverage);
            quarterAverage.unshift(quarterOverallAverage);
            annualAverage.unshift(annualOverallAverage);

            // Calculate current overall and the last overall for every period
            ({
                currentOverall: currentDayOverall,
                lastOverall: lastDayOverall,
            } = getCurrentAndLastOverall(weekOverallAverage));
            ({
                currentOverall: currentWeekOverall,
                lastOverall: lastWeekOverall,
            } = getCurrentAndLastOverall(monthOverallAverage));
            ({
                currentOverall: currentMonthOverall,
                lastOverall: lastMonthOverall,
            } = getCurrentAndLastOverall(quarterOverallAverage));
            ({
                currentOverall: currentQuarterOverall,
                lastOverall: lastQuarterOverall,
            } = getCurrentAndLastOverall(annualOverallAverage));
        }

        unitResults.push(
            {
                from: "2024-07-29",
                to: "2024-08-04",
                currentOverall: currentDayOverall,
                lastOverall: lastDayOverall,
                averages: weekAverage,
                labels: ["29", "30", "31", "1", "2", "3", "4"],
            },
            {
                from: "2024-08-01",
                to: "2024-08-31",
                currentOverall: currentWeekOverall,
                lastOverall: lastWeekOverall,
                averages: monthAverage,
                labels: [
                    "Jul/Week 2",
                    "Jul/Week 3",
                    "Jul/Week 4",
                    "Aug/Week 1",
                ],
            },
            {
                from: "2024-07-01",
                to: "2024-09-30",
                currentOverall: currentMonthOverall,
                lastOverall: lastMonthOverall,
                averages: quarterAverage,
                labels: ["July", "August", "September"],
            },
            {
                from: "2024-01-01",
                to: "2024-12-31",
                currentOverall: currentQuarterOverall,
                lastOverall: lastQuarterOverall,
                averages: annualAverage,
                labels: ["Q1", "Q2", "Q3"],
            }
        );

        // Response of API
        results.push(
            {
                filter: "Week",
                info: unitResults[0],
            },
            {
                filter: "Month",
                info: unitResults[1],
            },
            {
                filter: "Quarter",
                info: unitResults[2],
            },
            {
                filter: "Annual",
                info: unitResults[3],
            }
        );

        return results;
    } catch (error) {
        console.error(
            "Error fetching average score by categories data:",
            error
        );
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
            periodAverages.push(
                lastAverage ? Number(lastAverage.toFixed(1)) : lastAverage
            );

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
            periodAverages.push(Number(lastAverage.toFixed(1)));

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
                labels.push(currentDate.getDate().toString());
                currentDate.setDate(currentDate.getDate() + 1);
            }
            break;
        case "month":
            labels.push("Week 1", "Week 2", "Week 3", "Week 4");
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
    //CHARTS BY PAGE
    getDashboardCharts,
    getRecognitionsCharts,
    getRewardsCharts,
    getSurveysCharts,
    //CHARTS
    getTurnoverRate,
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
