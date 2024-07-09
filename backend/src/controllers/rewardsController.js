const Rewards = require("../models/RewardsModel");

const getAllRewards = async (req, res) => {
    try {
        const allRewards = await Rewards.find({});
        return res.status(200).json(allRewards);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getSingleReward = async (req, res) => {
    try {
        const { rewardId } = req.params;
        const allRewards = await Rewards.find({ rewardId });
        return res.status(200).json(allRewards);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// ----Add Rewards---

const addRewards = async (req, res) => {
    const {
        rewardId,
        title,
        image,
        category,
        pointsCost,
        startDate,
        endDate,
        details,
    } = req.body;

    try {
        const newRewards = new Rewards({
            rewardId,
            title,
            image,
            category,
            pointsCost,
            startDate,
            endDate,
            details,
        });
        await newRewards.save();
        return res.status(200).send("Rewards Saved");
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

// Rewards Management Status: ongoing, upcoming, finished, draft
const getRewardsManagementByStatus = async (req, res) => {
    const { status } = req.params;
    try {
        const surveys = await Rewards.find({ status });
        if (surveys.length === 0) {
            return res
                .status(404)
                .json({ message: `No rewards found with status: ${status}` });
        }
        return res.status(200).json(surveys);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Rewards Request Status: pending, approved, rejected
const getRewardsRequestByStatus = async (req, res) => {
    const { status } = req.params;
    try {
        const surveys = await Rewards.find({ status });
        if (surveys.length === 0) {
            return res
                .status(404)
                .json({ message: `No rewards found with status: ${status}` });
        }
        return res.status(200).json(surveys);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addRewards,
    getAllRewards,
    getSingleReward,
    getRewardsManagementByStatus,
    getRewardsRequestByStatus,
};
