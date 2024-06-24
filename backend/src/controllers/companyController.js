const Company = require("../models/companyModel");

const getCompanyName = async (req, res) => {
    try {
        const company = await Company.find({});
        console.log(company);
        return res.status(200).json(getCompanyName);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// wait for the ROI calculation and high fidelity wireframe
const getROI = async (req, res) => {};

const getEmployeesID = async (req, res) => {
    try {
        const { id } = req.params;
        const employeesID = await Company.find({});
        return res.status(200).json(employeesID);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCompanyName,
    getROI,
    getEmployeesID,
};
