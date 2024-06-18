const Company = require("../models/CompanyModel");

const addCompany = async (req, res) => {
    const { name, ROI, HR, employee } = req.body;

    try {
        const newCompany = new Company({
            name,
            ROI,
            HR,
            employee,
        });

        await newCompany.save();
        return res.status(200).send("Company Saved");
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

module.exports = {
    addCompany,
};
