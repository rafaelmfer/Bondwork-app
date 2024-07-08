const mongoose = require("mongoose");

const rewards = new mongoose.Schema({
    rewardId: {
        type: Number,
    },
    rewardName: {
        type: String,
    },
    rewardType: {
        type: String,
        required: true,
    },
    details: {
        type: String,
    },
    pointsCost: {
        type: Number,
    },
    status: {
        type: String,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
});

module.exports = mongoose.model("Rewards", rewards);
