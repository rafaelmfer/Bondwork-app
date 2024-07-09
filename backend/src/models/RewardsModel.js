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
    },
    image: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    pointsCost: {
        type: Number,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    details: {
        type: String,
    },
    status: {
        type: String,
    },
});

module.exports = mongoose.model("Rewards", rewards);
