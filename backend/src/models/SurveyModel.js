const mongoose = require("mongoose");

const SurveySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        // at least 20 words
        type: String,
        required: true,
    },
    jobLevel: {
        // eg: Senior managment, managment, mid-level
        type: Array,
        required: true,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    status: {
        // Finished, Ongoing, Upcoming, Draft
        type: String,
    },
    recurrence: {
        // annually,quarterly, monthly, weekly
        type: String,
    },
    points: {
        // can be from 100 - 200
        type: Number,
    },
    departments: {
        // eg:  IT, Accounting & Finance, Marketing, R&D
        type: Array,
    },
    answered: {
        // Array of IDs
        type: Array,
    },
    requested: {
        // Array of Ids
        type: Array,
    },
    question1: {
        type: String,
    },
    question1Answer: {
        type: Number,
    },
    question2: {
        type: String,
    },
    question2Answer: {
        type: Number,
    },
    question3: {
        type: String,
    },
    question3Answer: {
        type: Number,
    },
    question4: {
        type: String,
    },
    question4Answer: {
        type: Number,
    },
});

module.exports = mongoose.model("Survey", SurveySchema);
