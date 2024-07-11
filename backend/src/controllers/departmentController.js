const Department = require("../models/DepartmentModel");

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
    allDepartment,
    getSingleDepartment,
};
