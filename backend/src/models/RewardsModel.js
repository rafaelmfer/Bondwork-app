const mongoose = require("mongoose");

const rewards = new mongoose.Schema({
    rewardId: {
        type: Number,
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
});

module.exports = mongoose.model("Rewards", rewards);
