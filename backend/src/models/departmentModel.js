const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    departmentId: {
        type: Number,
    },
    departmentName: {
        type: String,
    },
    employees: [
        {
            type: String,
        },
    ],
    surveyAssign: [
        {
            type: String,
        },
    ],
});

module.exports = mongoose.model("Department", departmentSchema);
