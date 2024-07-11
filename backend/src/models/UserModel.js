const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const departmentSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
    { _id: false } // to avoid MongoDB create an id
);
const surveySchema = new mongoose.Schema(
    {
        id: {
            type: Number,
        },
        status: {
            type: String,
        },
        date: {
            type: Date,
        },
        answers: {
            type: [Number], // Array of numbers
        },
        NPS: {
            type: String,
        },
    },
    { _id: false }
);
const recognitionsSchema = new mongoose.Schema(
    {
        sent: {
            type: [Number],
        },
        received: {
            type: [Number],
        },
    },
    { _id: false }
);

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
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        department: {
            type: departmentSchema,
        },
        onBoardingDate: {
            type: Date,
            required: true,
        },
        jobTitle: {
            type: String,
        },
        jobLevel: {
            type: String,
        },
        profilePicture: {
            type: String,
        },
        adminRights: {
            type: Boolean,
        },
        surveys: {
            type: [surveySchema], // Array of surveys
        },
        rewards: {
            type: Array,
        },
        recognitions: {
            type: recognitionsSchema,
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

users.methods.comparePassword = (password, hashPassword) =>
    bcrypt.compareSync(password, hashPassword);

module.exports = mongoose.model("Users", users);
