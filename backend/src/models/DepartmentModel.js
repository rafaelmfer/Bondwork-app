const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    departmentId: {
        type: Number,
        required: true,
        unique: true,
    },
    departmentName: {
        type: String,
        required: true,
    },
    employees: {
        type: [Number],
    },
});

module.exports = mongoose.model("Department", departmentSchema);
