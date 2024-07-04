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

// ----Rewards Management----
const getRewardsByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const rewardsByStatus = await Rewards.find({ status });
        return res.status(200).json(rewardsByStatus);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addRewards,
    getAllRewards,
    getSingleReward,
    getRewardsByStatus,
};
