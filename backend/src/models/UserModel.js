const mongoose = require("mongoose");

const users = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        employeeID: {
            type: Number,
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        department: {
            type: String,
        },
        onBoardingDate: {
            type: Date,
        },
        jobTitle: {
            type: String,
        },
        profilePicture: {
            type: String,
        },
        adminRights: {
            type: Boolean,
        },
        surveys: {
            type: Array,
        },
        endorsements: {
            type: Array,
        },
        points: {
            type: Number,
        },
        lastAccess: {
            type: Date,
            default: Date.now,
        },
        workSchedule: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Users", users);
