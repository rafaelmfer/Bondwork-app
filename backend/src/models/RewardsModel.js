const mongoose = require("mongoose");

const redeemSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        requestDate: {
            type: Date,
        },
        date: {
            type: Date,
        },
        reason: {
            type: String,
        },
        rejectDetails: {
            type: String,
        },
    },
    { _id: false }
);

const rewards = new mongoose.Schema({
    rewardId: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    image: {
        type: String,
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
    redeem: {
        type: [redeemSchema],
    },
    publish: {
        type: Boolean,
    },
});

module.exports = mongoose.model("Rewards", rewards);
