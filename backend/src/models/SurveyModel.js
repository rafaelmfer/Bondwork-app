const mongoose = require("mongoose");

const SurveySchema = new mongoose.Schema(
    {
        surveyId: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        jobLevel: {
            type: [String],
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        status: {
            type: String,
        },
        recurrence: {
            type: String,
        },
        points: {
            type: Number,
        },
        departments: {
            type: [String],
        },
        departmentId: {
            type: [Number],
        },
        completed: {
            type: [Number],
        },
        sent: {
            type: [Number],
        },
        questions: {
            type: [String],
        },
        publish: {
            type: Boolean,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Survey", SurveySchema);
