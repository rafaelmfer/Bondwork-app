const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
    },

    ROI: [
        {
            type: Number,
        },
    ],

    employeesId: [
        {
            type: Number,
        },
    ],
});

module.exports = mongoose.model("Company", companySchema);
