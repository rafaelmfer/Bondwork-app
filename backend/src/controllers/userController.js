const User = require("../models/UserModel");
const Rewards = require("../models/RewardsModel");
const Recognitions = require("../models/RecognitionModel");
const Surveys = require("../models/SurveyModel");

const allUser = async (req, res) => {
    try {
        const showAllUsers = await User.find({}).lean();
        const surveyCache = {};

        // Iterate over each user's surveys
        const enrichedUsers = await Promise.all(
            showAllUsers.map(async (user) => {
                const enrichedSurveys = await Promise.all(
                    // Iterate over each survey
                    user.surveys.map(async (survey) => {
                        if (!surveyCache[survey.id]) {
                            surveyCache[survey.id] = await Surveys.findOne({
                                surveyId: survey.id,
                            }).lean();
                        }
                        const surveyData = surveyCache[survey.id];

                        if (surveyData) {
                            return {
                                ...survey,
                                surveyName: surveyData.name,
                                startDate: surveyData.startDate,
                                endDate: surveyData.endDate,
                            };
                        }
                        return survey;
                    })
                );

                return {
                    ...user,
                    surveys: enrichedSurveys,
                };
            })
        );

        return res.status(200).json(enrichedUsers);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getOneUser = async (req, res) => {
    try {
        const { employeeID } = req.params;
        const oneUser = await User.findOne({
            employeeID: parseInt(employeeID),
        }).lean();
        if (!oneUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const userCache = {}; // Cache to store user data
        const userDetailCache = {}; // Cache to store user details (name, jobtitle)

        // Look for user's rewards
        const rewardDetails = await Promise.all(
            oneUser.rewards.map(async (rewardId) => {
                if (!userCache[rewardId]) {
                    userCache[rewardId] = await Rewards.findOne({
                        rewardId,
                    }).lean();
                }
                const reward = userCache[rewardId];

                if (reward) {
                    // Filter redeem entries by employeeID
                    const filteredRedeems = reward.redeem.filter(
                        (redeemEntry) => redeemEntry.id === oneUser.employeeID
                    );

                    return filteredRedeems.map((redeemEntry) => ({
                        rewardId: reward.rewardId,
                        title: reward.title,
                        category: reward.category,
                        pointsCost: reward.pointsCost,
                        requestDate: redeemEntry.requestDate,
                        status: redeemEntry.status,
                    }));
                }
                return [];
            })
        );
        const flattenedRewards = rewardDetails.flat(); // to convert all the arrays into a single final rewards array

        // Combine sent and received recognitions
        const allRecognitions = [
            ...oneUser.recognitions.sent,
            ...oneUser.recognitions.received,
        ];

        // Look for user's recognitions
        const recognitionDetails = await Promise.all(
            allRecognitions.map(async (recognitionId) => {
                if (!userCache[recognitionId]) {
                    userCache[recognitionId] = await Recognitions.findOne({
                        recognitionId,
                    }).lean();
                }
                const recognition = userCache[recognitionId];

                if (recognition) {
                    const senderDetails = await getUserDetails(
                        recognition.sender,
                        oneUser,
                        userDetailCache
                    );
                    const receiverDetails = await getUserDetails(
                        recognition.receiver,
                        oneUser,
                        userDetailCache
                    );

                    return {
                        recognitionId: recognition.recognitionId,
                        details: recognition.details,
                        sender: senderDetails,
                        receiver: receiverDetails,
                        status: recognition.status,
                        category: recognition.category,
                        dateRequest: recognition.dateRequest,
                        date: recognition.date,
                        points: recognition.points,
                        reason: recognition.reason,
                        rejectDetails: recognition.rejectDetails,
                    };
                }
                return null;
            })
        );
        // To eliminate the possible errors inside the database or recognitions that weren't found
        const filteredRecognitions = recognitionDetails.filter(Boolean); // Remove null values

        // Look for user's surveys
        const surveyDetails = await Promise.all(
            oneUser.surveys.map(async (survey) => {
                if (!userCache[survey.id]) {
                    userCache[survey.id] = await Surveys.findOne({
                        surveyId: survey.id,
                    }).lean();
                }
                const surveyData = userCache[survey.id];

                if (surveyData) {
                    return {
                        ...survey,
                        surveyName: surveyData.name,
                        startDate: surveyData.startDate,
                        endDate: surveyData.endDate,
                    };
                }
                return survey;
            })
        );
        // Create a new user object excluding 'rewards', 'recognitions', and 'surveys'
        const { rewards, recognitions, surveys, ...userWithoutDuplicateData } =
            oneUser;

        // Put everything together
        const enrichedUser = {
            ...userWithoutDuplicateData,
            rewards: flattenedRewards,
            recognitions: filteredRecognitions,
            surveys: surveyDetails,
        };

        return res.status(200).json(enrichedUser);
    } catch (error) {
        return res.status(500).json({ messsage: error.message });
    }
};

// Function inside getOneUser to write the name and jobtitle in the recognitions
async function getUserDetails(employeeID, currentUser, userDetailCache) {
    if (employeeID === currentUser.employeeID) {
        return {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            jobTitle: currentUser.jobTitle,
        };
    }

    if (!userDetailCache[employeeID]) {
        const user = await User.findOne({ employeeID }).lean();
        if (user) {
            userDetailCache[employeeID] = {
                firstName: user.firstName,
                lastName: user.lastName,
                jobTitle: user.jobTitle,
            };
        }
    }
    return userDetailCache[employeeID];
}

// ------------------------------------

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
