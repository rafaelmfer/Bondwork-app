const User = require("../models/UserModel");

const allUser = async (req, res) => {
    try {
        const showAllUsers = await User.find({});
        return res.status(200).json(showAllUsers);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getOneUser = async (req, res) => {
    try {
        const { employeeID } = req.params;
        const oneUser = await User.findOne({ employeeID: employeeID });
        return res.status(200).json(oneUser);
    } catch (error) {
        return res.status(500).json({ messsage: error.message });
    }
};

const getEmployeeID = async (req, res) => {
    try {
        const employeeID = parseInt(req.params.employeeID);
        const singleNote = await User.findOne({ employeeID: employeeID });
        return res.status(200).json(singleNote);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const postDepartments = async (req, res) => {
    try {
        const { departments } = req.body; // Read departments array from the request body
        if (!departments || !Array.isArray(departments)) {
            return res
                .status(400)
                .json({ message: "Departments must be an array." });
        }
        const usersInDepartments = await User.find({
            department: { $in: departments },
        });
        return res.status(200).json(usersInDepartments);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getUsersByAdminRights = async (adminRights, res, notFoundMessage) => {
    try {
        const showAllUsers = await User.find({ adminRights });

        if (showAllUsers.length === 0) {
            return res.status(404).json({ message: notFoundMessage });
        }

        return res.status(200).json(showAllUsers);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getHrStaff = (req, res) =>
    getUsersByAdminRights(true, res, "No HR staff found");

const getEmployeeStaff = (req, res) =>
    getUsersByAdminRights(false, res, "No Employee staff found");

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const surveyUpdate = await User.findByIdAndUpdate(id, req.body);

        if (!surveyUpdate) {
            return res
                .status(404)
                .json({ message: `Cannot find any User with id: ${id}` });
        }

        const showUpdate = await User.findById(id);
        return res.status(200).json(showUpdate);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const addUser = async (req, res) => {
    const {
        email,
        password,
        employeeID,
        firstName,
        lastName,
        department,
        onBoardingDate,
        jobTitle,
        profilePicture,
        adminRights,
        surveys,
        points,
        lastAccess,
        workSchedule,
    } = req.body;

    try {
        const newUser = new User({
            email,
            password,
            employeeID,
            firstName,
            lastName,
            department,
            onBoardingDate,
            jobTitle,
            profilePicture,
            adminRights,
            surveys,
            endorsements,
            points,
            lastAccess,
            workSchedule,
        });

        await newUser.save();
        return res.status(200).send("User Saved");
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

module.exports = {
    addUser,
    allUser,
    getOneUser,
    getEmployeeID,
    postDepartments,
    updateUser,
    getHrStaff,
    getEmployeeStaff,
};
