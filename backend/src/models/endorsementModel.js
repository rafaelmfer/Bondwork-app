const mongoose = require("mongoose");

const EndorsementSchema = new mongoose.Schema({
    endorsement_id: {
        type: Number,
    },
    individual_endorsement_id: {
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
    published: {
        type: Boolean,
    },
    receiverDepartment: {
        type: String,
    },
    receiverJobTitle: {
        type: String,
    },
    receiverName: {
        type: String,
    },
    receiverPicture: {
        type: String,
    },
    senderDepartment: {
        type: String,
    },
    senderJobTitle: {
        type: String,
    },
    senderName: {
        type: String,
    },
    senderPicture: {
        type: String,
    },
    receiverJobLevel: {
        type: Number,
    },
    senderJobLevel: {
        type: Number,
    },
});

module.exports = mongoose.model("Endorsement", EndorsementSchema);
