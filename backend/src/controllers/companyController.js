const Company = require("../models/companyModel");

const getAll = async (req, res) => {
    try {
        const company = await Company.find({});
        console.log(company);
        return res.status(200).json({ name: "tttt" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getCompanyName = async (req, res) => {
    try {
        const company = await Company.find();
        console.log(company);
        return res.status(200).json({ name: "tttt" });
    } catch (error) {
        return res.status(500).json({ message: error.message });

        // const { id } = req.params;

        // if SurveyPage {
        //  change survey table
        //  do whatever you want in the survey table
        // }
        // if RewardsPage {
        //     change rewards table
        //     do whatever you want in the rewards table
        // }
        // if Recognition {
        //     change recognition table
        //     do whatever you want in the recognition table
        // }
    }
};

// wait for the ROI calculation and high fidelity wireframe
const getROI = async (req, res) => {};

const getEmployeesID = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await Company.find({});
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }
        return res.status(200).json({ employeesId: company.employeesId });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAll,
    getCompanyName,
    getROI,
    getEmployeesID,
};
