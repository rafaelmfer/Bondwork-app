const mongoose = require("mongoose");

const rewards = new mongoose.Schema({
    rewardId: {
        type: Number,
    },
    title: {
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
