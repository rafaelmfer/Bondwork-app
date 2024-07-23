const Survey = require("../models/SurveyModel");
const User = require("../models/UserModel");
const User = require("../models/UserModel");
//const Recognition = require("../models/endorsementModel");
const Rewards = require("../models/RewardsModel");
const moment = require("moment");

// ----Turnover Rate----
const getTurnoverRate = async (req, res) => {
    try {
        const requestDate = moment(req.body.date);

        const calculateTurnoverRateForDay = async (date) => {
            const from = date.format("YYYY-MM-DD");
            const to = date.format("YYYY-MM-DD");
            return parseFloat(await calculateTurnoverRate(from, to)).toFixed(2);
        };

        const getWeekResults = async (date) => {
            const requestDate = date.clone();
            const dayBeforeRequestDate = requestDate.clone().subtract(1, "day");

            const requestDayTurnoverRate =
                await calculateTurnoverRateForDay(requestDate);
            const dayBeforeRequestDayTurnoverRate =
                await calculateTurnoverRateForDay(dayBeforeRequestDate);

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
                    const difference = (
                        dailyTurnoverRates[i] - dailyTurnoverRates[i - 1]
                    ).toFixed(2);
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
                date.clone().subtract(3, "weeks").startOf("isoWeek"),
            ];

            const [
                currentWeek,
                previousWeek,
                weekBeforePreviousWeek,
                weekBeforePreviousWeekComparison,
            ] = await Promise.all(
                weekStartDates.map((startOfWeek, index) =>
                    calculateWeeklyResults(startOfWeek, index > 0)
                )
            );

            const badges = [
                (
                    requestDayTurnoverRate - dayBeforeRequestDayTurnoverRate
                ).toFixed(2),
                previousWeek.dailyDifferences,
                weekBeforePreviousWeek.dailyDifferences,
            ];

            const results = weekStartDates
                .slice(0, 3)
                .map((startOfWeek, index) => ({
                    from: startOfWeek.format("YYYY-MM-DD"),
                    to: startOfWeek.clone().add(6, "days").format("YYYY-MM-DD"),
                    current:
                        index === 0
                            ? requestDayTurnoverRate
                            : [previousWeek, weekBeforePreviousWeek][index - 1]
                                  .dailyTurnoverRates,
                    badge: badges[index],
                    values: [currentWeek, previousWeek, weekBeforePreviousWeek][
                        index
                    ].values,
                    labels: [currentWeek, previousWeek, weekBeforePreviousWeek][
                        index
                    ].labels,
                }));

            return {
                filter: "Week",
                info: results,
            };
        };

        const getMonthResults = async (date) => {
            const requestDate = date.clone();
            const monthStart = requestDate.clone().startOf("month");
            const monthEnd = requestDate.clone().endOf("month");
            const monthResults = [];
            const values = [];
            const labels = [];
            const current = [];
            const badges = [];

            let weekStart = monthStart.clone();
            let lastWeekTurnoverRate = null;

            while (weekStart.isBefore(monthEnd)) {
                const from = weekStart.clone().format("YYYY-MM-DD");
                const to = moment
                    .min(weekStart.clone().add(6, "days"), monthEnd)
                    .format("YYYY-MM-DD");

                let turnoverRate = await calculateTurnoverRate(from, to);
                turnoverRate = parseFloat(turnoverRate).toFixed(2);

                if (weekStart.isSameOrBefore(requestDate, "week")) {
                    current.push(parseFloat(turnoverRate));
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
                                parseFloat(turnoverRate) -
                                parseFloat(lastWeekRate)
                            ).toFixed(2)
                        );
                    }
                } else {
                    current.push(null);
                    values.push(null);
                    badges.push(null);
                }

                labels.push(`week${monthResults.length + 1}`);
                lastWeekTurnoverRate = turnoverRate;

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
                        current,
                        badge: badges,
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

            const quarterResults = [];
            let currentMonth = quarterStart.clone();

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

                quarterResults.push({
                    from: monthStart,
                    to: monthEnd,
                    turnoverRate,
                });
                currentMonth.add(1, "month");
            }

            return { unit: "quarter", unitResults: quarterResults };
        };

        const getAnnualResults = async (date) => {
            const yearStart = date.clone().startOf("year");
            const yearEnd = date.clone().endOf("year");
            const annualResults = [];

            let quarterStart = yearStart.clone();

            while (quarterStart.isBefore(yearEnd)) {
                const from = quarterStart.format("YYYY-MM-DD");
                const to = quarterStart
                    .clone()
                    .add(2, "months")
                    .endOf("month")
                    .format("YYYY-MM-DD");

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
                }

                annualResults.push({ from, to, turnoverRate });
                quarterStart.add(3, "months");
            }

            return { unit: "annual", unitResults: annualResults };
        };

        // Helper function to calculate turnover rate
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
