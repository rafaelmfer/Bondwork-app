const Survey = require("../models/SurveyModel");
const User = require("../models/UserModel");
//const Recognition = require("../models/endorsementModel");
const Rewards = require("../models/RewardsModel");
const moment = require("moment");
// const { getPeriodDates } = require("../utils/utils");

// Show all number on dashboard:
// Do the calculation after the logic is settle
// Get numbers from each database, don't need to create new database and models for dashboard

// ----Turnover Rate----
// based on users
// current: percentage of the current day (not average!)
// badge: compare current day this week to the same day in last week (friday vs last friday)
// chart: all data for each day (frontend will call the range they want)
const getTurnoverRate = async (req, res) => {
    try {
        const requestDate = moment(req.body.date);

        // Define time periods
        const getWeekResults = async (date) => {
            const weekStart = date.startOf("isoWeek"); // Starting from Monday
            const weekResults = [];

            for (let i = 0; i < 7; i++) {
                const from = weekStart
                    .clone()
                    .add(i, "days")
                    .format("YYYY-MM-DD");
                const to = weekStart
                    .clone()
                    .add(i, "days")
                    .format("YYYY-MM-DD");
                const turnoverRate = await calculateTurnoverRate(from, to);
                weekResults.push({ from, to, turnoverRate });
            }

            return { unit: "week", unitResults: weekResults };
        };

        const getMonthResults = async (date) => {
            const monthStart = date.clone().startOf("month");
            const monthEnd = date.clone().endOf("month");
            const monthResults = [];
            console.log(
                `Month Start: ${monthStart.format("YYYY-MM-DD")}, Month End: ${monthEnd.format("YYYY-MM-DD")}`
            );

            let weekStart = monthStart.clone().startOf("isoWeek");
            while (weekStart.isBefore(monthEnd)) {
                const from = weekStart.clone().format("YYYY-MM-DD");
                const to = moment
                    .min(weekStart.clone().endOf("isoWeek"), monthEnd)
                    .format("YYYY-MM-DD");
                console.log(`Week From: ${from}, Week To: ${to}`);

                const turnoverRate = await calculateTurnoverRate(from, to);
                monthResults.push({ from, to, turnoverRate });

                // Move to the next week
                weekStart.add(1, "week");
            }

            return { unit: "month", unitResults: monthResults };
        };

        const getQuarterResults = async (date) => {
            const previousMonth = date.clone().subtract(1, "months");
            const currentMonth = date.clone();
            const nextMonth = date.clone().add(1, "months");

            const quarterResults = [];
            for (const month of [previousMonth, currentMonth, nextMonth]) {
                const monthStart = month.startOf("month").format("YYYY-MM-DD");
                const monthEnd = month.endOf("month").format("YYYY-MM-DD");
                const turnoverRate = await calculateTurnoverRate(
                    monthStart,
                    monthEnd
                );
                quarterResults.push({
                    from: monthStart,
                    to: monthEnd,
                    turnoverRate,
                });
            }

            return { unit: "quarter", unitResults: quarterResults };
        };

        const getAnnualResults = async (date) => {
            const yearStart = date.startOf("year");
            const annualResults = [];

            for (
                let quarterStart = yearStart.clone();
                quarterStart.isBefore(date.endOf("year"));
                quarterStart.add(3, "months")
            ) {
                const from = quarterStart.format("YYYY-MM-DD");
                const to = quarterStart
                    .clone()
                    .add(2, "months")
                    .endOf("month")
                    .format("YYYY-MM-DD");
                const turnoverRate = await calculateTurnoverRate(from, to);
                annualResults.push({ from, to, turnoverRate });
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

            if (totalEmployees === 0) return "0.00%";
            const turnoverRate = (
                (terminatedEmployees / totalEmployees) *
                100
            ).toFixed(2);
            return `${turnoverRate}%`;
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
