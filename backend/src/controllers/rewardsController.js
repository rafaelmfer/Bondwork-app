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

const insertRewards = async (req, res) => {
    const { rewardId, rewardType, details, pointsCost, status } = req.body;

    try {
        const newRewards = new Rewards({
            rewardId,
            rewardType,
            details,
            pointsCost,
            status,
        });
        await newRewards.save();
        return res.status(200).send("Rewards Saved");
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

// const getAllNote = async (req, res) => {
//     try {
//         const allNotes = await Note.find({});
//         res.status(200).json(allNotes);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

module.exports = {
    insertRewards,
    getAllRewards,
    getSingleReward,
};
