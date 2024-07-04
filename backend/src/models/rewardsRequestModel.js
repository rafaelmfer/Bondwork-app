const mongoose = require("mongoose");

const rewardsRequest = new mongoose.Schema({
    rewardsRequest: {
        type: Number,
    },
    rewardID: {
        type: Number,
    },
    employeeRequestID: {
        type: Number,
    },
    status: {
        type: String,
    },
    requestedDate: {
        type: Date,
    },
});

module.exports = mongoose.model("rewardsRequest", rewardsRequest);
