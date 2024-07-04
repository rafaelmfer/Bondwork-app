const mongoose = require("mongoose");

const RecognitionSchema = new mongoose.Schema({
    recognition_id: {
        type: Number,
    },
    details: {
        type: String,
    },
    sender: {
        type: Number,
    },
    receiver: {
        type: Number,
    },
    status: {
        type: String,
    },
    category: {
        type: String,
    },
    date: {
        type: Date,
    },
    points: {
        type: Number,
    },
    receiverDepartment: {
        type: String,
    },
    receiverPicture: {
        type: String,
    },
    senderDepartment: {
        type: String,
    },
    senderPicture: {
        type: String,
    },
    receiverJobTitle: {
        type: String,
    },
    senderJobTitle: {
        type: String,
    },
    receiverName: {
        type: String,
    },
    senderName: {
        type: String,
    },
    receiverJobLevel: {
        type: Number,
    },
    senderJobLevel: {
        type: Number,
    },
});

module.exports = mongoose.model("Recognition", RecognitionSchema);
