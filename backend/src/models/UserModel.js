const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const users = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        hashPassword: {
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
        NPS: {
            type: String,
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
        rewards: [
            {
                type: Object,
            },
        ],
    },
    {
        timestamps: true,
    }
);

users.methods.comparePassword = (password, hashPassword) =>
    bcrypt.compareSync(password, hashPassword);

module.exports = mongoose.model("Users", users);
