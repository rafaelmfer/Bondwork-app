const Survey = require("../models/SurveyModel");
const User = require("../models/UserModel");
//const Recognition = require("../models/endorsementModel");
const Rewards = require("../models/RewardsModel");
const moment = require("moment");

// ----Turnover Rate----
const getTurnoverRate = async (req, res) => {
    try {
        const requestDate = moment(req.body.date);

        const getWeekResults = async (date) => {
            const startOfWeek = date.clone().startOf("isoWeek"); // Monday
            const endOfWeek = date.clone().endOf("isoWeek"); // Sunday
            const previousWeekStart = startOfWeek.clone().subtract(1, "weeks");
            const previousWeekEnd = endOfWeek.clone().subtract(1, "weeks");

            const dailyResults = [];
            const badgeResults = [];

            for (let i = 0; i < 7; i++) {
                const dayStart = startOfWeek
                    .clone()
                    .add(i, "days")
                    .startOf("day");
                const dayEnd = startOfWeek.clone().add(i, "days").endOf("day");
                if (dayStart.isAfter(date)) {
                    dailyResults.push(null);
                    badgeResults.push(null);
                } else {
                    const dailyTurnover = await calculateTurnoverRate(
                        dayStart,
                        dayEnd
                    );
                    dailyResults.push(dailyTurnover);
                    if (i === 0) {
                        badgeResults.push(dailyTurnover); // First day badge comparison with itself
                    } else {
                        const previousDayStart = startOfWeek
                            .clone()
                            .add(i - 1, "days")
                            .startOf("day");
                        const previousDayEnd = startOfWeek
                            .clone()
                            .add(i - 1, "days")
                            .endOf("day");
                        const previousDayTurnover = await calculateTurnoverRate(
                            previousDayStart,
                            previousDayEnd
                        );
                        const badgeComparison = (
                            dailyTurnover - previousDayTurnover
                        ).toFixed(2);
                        badgeResults.push(badgeComparison);
                    }
                }
            }

            const currentWeekTurnover = await calculateTurnoverRate(
                startOfWeek,
                endOfWeek
            );
            const previousWeekTurnover = await calculateTurnoverRate(
                previousWeekStart,
                previousWeekEnd
            );
            const currentBadge = (
                currentWeekTurnover - previousWeekTurnover
            ).toFixed(2);

            return {
                filter: "Week",
                info: [
                    {
                        from: startOfWeek.format("YYYY-MM-DD"),
                        to: endOfWeek.format("YYYY-MM-DD"),
                        current: currentWeekTurnover,
                        currentBadge,
                        badge: badgeResults,
                        value: dailyResults,
                        labels: [
                            startOfWeek.date(),
                            startOfWeek.clone().add(1, "days").date(),
                            startOfWeek.clone().add(2, "days").date(),
                            startOfWeek.clone().add(3, "days").date(),
                            startOfWeek.clone().add(4, "days").date(),
                            startOfWeek.clone().add(5, "days").date(),
                            startOfWeek.clone().add(6, "days").date(),
                        ],
                    },
                ],
            };
        };

        const getMonthResults = async (date) => {
            const requestDate = date.clone();
            const monthStart = requestDate.clone().startOf("month");
            const monthEnd = requestDate.clone().endOf("month");
            const monthResults = [];
            const values = [];
            const labels = [];
            const badges = [];
            let current = null;

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
                        values,
                        labels,
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
                unit: "quarter",
                unitResults: [
                    {
                        from: quarterStart.format("YYYY-MM-DD"),
                        to: quarterEnd.format("YYYY-MM-DD"),
                        current: formattedCurrentQuarterTurnoverRate, // Always show the turnover rate of the request quarter
                        currentBadge: currentBadge, // Compare turnover rate of current quarter to previous quarter
                        badge: badges, // Compare turnover rate of month to previous month in the quarter
                        value: values,
                        label: labels,
                    },
                ],
            };
        };

        const getAnnualResults = async (date) => {
            const yearStart = date.clone().startOf("year");
            const yearEnd = date.clone().endOf("year");
            const annualResults = [];

            let quarterStart = yearStart.clone();
            let previousQuarterTurnoverRate = null;
            let totalTurnoverRateSum = 0;
            let quartersCount = 0;

            const badges = [];
            const values = [];
            const labels = [];

            // Variable to store the turnover rate of the quarter containing the request date
            let currentQuarterTurnoverRate = null;

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
            const formattedRequestQuarterTurnoverRate = parseFloat(
                requestQuarterTurnoverRate
            ).toFixed(2);

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
                values.push(turnoverRate);
                labels.push(`Q${Math.floor((quarterStart.month() + 3) / 3)}`);

                previousQuarterTurnoverRate = turnoverRate;
                quarterStart.add(3, "months");
            }

            const annualTurnoverRate = (
                totalTurnoverRateSum / quartersCount
            ).toFixed(2);

            return {
                unit: "annual",
                unitResults: [
                    {
                        from: yearStart.format("YYYY-MM-DD"),
                        to: yearEnd.format("YYYY-MM-DD"),
                        current: formattedCurrentYearTurnoverRate, // Show the turnover rate of the current year
                        currentBadge: currentBadge, // Compare turnover rate of current year to previous year
                        badge: badges, // Compare turnover rate of quarter to previous quarter in the year
                        value: values,
                        label: labels,
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

        res.json({
            results: [weekResults, monthResults, quarterResults, annualResults],
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ----Satisfaction Drivers----
// based on survey
const getSatisfactionDrivers = async (req, res) => {
    // overall: the number of overall on current day
    // badge: compare current day this week to the same day in last week (friday vs last friday)
    // chart: all data for each day (frontend will call the range they want)
};

// ----Recognition----
const getRecognition = async (req, res) => {};

const getRewardsRequest = async (req, res) => {
    try {
        const units = ["week", "month", "quarter", "annual"];
        const results = [];

        for (const unit of units) {
            const { startCurrent, startPrevious, endPrevious } =
                await getPeriodDates(unit);

            const currentCounts = await Rewards.find({
                date: { $gte: startCurrent, $lt: new Date() },
            }).exec();

            const previousCounts = await Rewards.find({
                date: { $gte: startPrevious, $lt: endPrevious },
            }).exec();

            const currentStatusCounts = currentCounts.reduce(
                (acc, reward) => {
                    acc.totalAmount += 1;
                    acc[reward.status] += 1;
                    return acc;
                },
                { totalAmount: 0, pending: 0, approved: 0, rejected: 0 }
            );

            const previousStatusCounts = previousCounts.reduce(
                (acc, reward) => {
                    acc.totalAmount += 1;
                    acc[reward.status] += 1;
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
                currentStatusCounts.approved - previousStatusCounts.approved;
            const rejectedBadge =
                currentStatusCounts.rejected - previousStatusCounts.rejected;

            results.push({
                filter: unit.charAt(0).toUpperCase() + unit.slice(1),
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

        res.status(200).json(results);
    } catch (error) {
        console.error("Error fetching recognition data:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getTurnoverRate,
    getSatisfactionDrivers,
    getRecognition,
    getRewardsRequest,
};
