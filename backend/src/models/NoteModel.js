const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        content: {
            type: String,
            required: true,
        },
        client_id: {
            type: String,
        },
        activity_id: {
            type: String,
        },
        user_id: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Note", noteSchema);
