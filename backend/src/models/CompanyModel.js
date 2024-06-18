// models/CompanyModel.js
const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        ROI: {
            type: Number,
            required: true,
        },
        HR: [
            {
                type: String,
            },
        ],
        employees: [
            {
                type: String,
            },
        ],
    },
    {
        collection: "company", // Use 'company' as the collection name
    }
);

module.exports = mongoose.model("Company", companySchema);
