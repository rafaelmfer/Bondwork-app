const mongoose = require("mongoose");

const EndorsementSchema = new mongoose.Schema({
    details: {
        type: String,
    },
    sender: {
        type: String,
    },
    receiver: {
        type: String,
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
});

module.exports = mongoose.model("Endorsement", EndorsementSchema);
