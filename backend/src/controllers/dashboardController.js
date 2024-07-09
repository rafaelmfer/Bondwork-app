const Survey = require("../models/SurveyModel");
const Users = require("../models/UserModel");
//const Recognition = require("../models/endorsementModel");
const Rewards = require("../models/RewardsModel");

// Show all number on dashboard:
// Do the calculation after the logic is settle
// Get numbers from each database, don't need to create new database and models for dashboard

const getPeriodDates = async (unit) => {
    const now = new Date();
    let startCurrent;
    let startPrevious;
    let endPrevious;

    switch (unit) {
        case "week":
            startCurrent = new Date(now.setDate(now.getDate() - now.getDay()));
            startPrevious = new Date(now.setDate(now.getDate() - 7));
            endPrevious = new Date(startCurrent);
            break;
        case "month":
            startCurrent = new Date(now.getFullYear(), now.getMonth(), 1);
            startPrevious = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            endPrevious = new Date(startCurrent);
            break;
        case "quarter":
            const currentQuarter = Math.floor((now.getMonth() + 3) / 3);
            startCurrent = new Date(
                now.getFullYear(),
                (currentQuarter - 1) * 3,
                1
            );
            startPrevious = new Date(
                now.getFullYear(),
                (currentQuarter - 2) * 3,
                1
            );
            endPrevious = new Date(startCurrent);
            break;
        case "annual":
            startCurrent = new Date(now.getFullYear(), 0, 1);
            startPrevious = new Date(now.getFullYear() - 1, 0, 1);
            endPrevious = new Date(startCurrent);
            break;
        default:
            throw new Error("Invalid unit");
    }

    return { startCurrent, startPrevious, endPrevious };
};

// ----Turnover Rate----
// based on users
// calculation: get data from employees database (get amount of employees based on "start hiring date" and "leaving date")
const getTurnoverRate = async (req, res) => {
    // current: percentage of the current day (not average!)
    // badge: compare current day this week to the same day in last week (friday vs last friday)
    // chart: all data for each day (frontend will call the range they want)
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
    getPeriodDates,
};
