const Department = require("../models/departmentModel");

const insertDepartment = async (req, res) => {
    const { departmentId, departmentName, employees, surveyAssign } = req.body;

    try {
        const newDepartment = new Department({
            departmentId,
            departmentName,
            employees,
            surveyAssign,
        });
        await newDepartment.save();
        return res.status(200).send("Department Saved");
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

const allDepartment = async (req, res) => {
    try {
        const allDepartments = await Department.find({});
        return res.status(200).json(allDepartments);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getSingleDepartment = async (req, res) => {
    try {
        const { departmentId } = req.params;
        const allDepartments = await Department.find({
            departmentId,
        });
        return res.status(200).json(allDepartments);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    insertDepartment,
    allDepartment,
    getSingleDepartment,
};
