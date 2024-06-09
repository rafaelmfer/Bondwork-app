const mongoose = require("mongoose");

const SurveySchema = new mongoose.Schema({
    surveyID: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    question1: {
        type: String,
        required: true,
    },
    question1Answer: {
        type: Number,
        required: true,
    },
    question2: {
        type: String,
        required: true,
    },
    question2Answer: {
        type: Number,
        required: true,
    },
    question3: {
        type: String,
        required: true,
    },
    question3Answer: {
        type: Number,
        required: true,
    },
    alreadyAnswered: {
        type: Number,
    },
    totalOfEmployees: {
        type: Number,
    },
    points: {
        type: Number,
    },
    dateStart: {
        type: Date,
        default: Date.now,
    },
    dateFinish: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Survey", SurveySchema);
