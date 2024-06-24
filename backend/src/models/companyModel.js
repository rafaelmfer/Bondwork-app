const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    _id: {
        type: String,
    },

    companyName: {
        type: String,
    },
});

module.exports = mongoose.model("Company", companySchema);
