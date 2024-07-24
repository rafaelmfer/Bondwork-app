const mongoose = require("mongoose");

const RecognitionSchema = new mongoose.Schema({
    recognitionId: {
        type: Number,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    sender: {
        type: Number,
        required: true,
    },
    receiver: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    dateRequest: {
        type: Date,
    },
    date: {
        type: Date,
    },
    points: {
        type: Number,
        required: true,
    },
    reason: {
        type: String,
    },
    rejectDetails: {
        type: String,
    },
});

module.exports = mongoose.model("Recognition", RecognitionSchema);
