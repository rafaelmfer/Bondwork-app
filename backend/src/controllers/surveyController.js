const Survey = require("../models/SurveyModel");
const User = require("../models/UserModel");

const getAllSurvey = async (req, res) => {
    try {
        const allSurvey = await Survey.find({});
        return res.status(200).json(allSurvey);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getSingleSurvey = async (req, res) => {
    try {
        const { id } = req.params;
        const singleSurvey = await Survey.findById(id);

        return res.status(200).json(singleSurvey);
    } catch (error) {
        return res.status(500).json({ messsage: error.message });
    }
};

const getSingleSurveyID = async (req, res) => {
    try {
        const { surveyId } = req.params;
        const singleSurvey = await Survey.findOne({ surveyId });

        if (!singleSurvey) {
            return res.status(404).json({ message: "Survey not found" });
        }

        const audienceDetailsCreated = await Promise.all(
            singleSurvey.sent.map(async (id) => {
                const user = await User.findOne({ employeeID: id });

                if (!user) {
                    return {
                        employeeID: id,
                        userName: null,
                        jobTitle: null,
                        email: null,
                        survey: null,
                    };
                }

                const userSurvey = user.surveys.find(
                    (survey) => survey.id === parseInt(surveyId, 10)
                );

                return {
                    employeeID: id,
                    userName: `${user.firstName} ${user.lastName}`,
                    jobTitle: user.jobTitle,
                    email: user.email,
                    departmentName: user.department.name,
                    profilePicture: user.profilePicture,

                    survey: userSurvey
                        ? {
                              surveyId: userSurvey.id,
                              startDate: singleSurvey.startDate,
                              endDate: singleSurvey.endDate,
                              completedDate: userSurvey.date,
                              NPS: userSurvey.NPS,
                              status: userSurvey.status,
                              answers: userSurvey.answers,
                          }
                        : null,
                };
            })
        );

        const newSurvey = {
            ...singleSurvey._doc,
            audienceDetails: audienceDetailsCreated,
        };

        return res.status(200).json(newSurvey);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateSurvey = async (req, res) => {
    try {
        const { id } = req.params;
        const survey = await Survey.findOne({ surveyId: id });
        if (!survey) {
            return res
                .status(404)
                .json({ message: `Cannot find any survey with id: ${survey}` });
        }

        const updates = {};
        const allowedFields = [
            ["departments"],
            ["jobLevel"],
            "startDate",
            "endDate",
            "description",
        ];
        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });

        const surveyUpdate = await Survey.findByIdAndUpdate(survey, updates, {
            new: true,
        });

        if (!surveyUpdate) {
            return res
                .status(404)
                .json({ message: `Cannot update survey with id: ${survey}` });
        }

        return res.status(200).json(surveyUpdate);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// TODO Fix it to save into database
const addSurvey = async (req, res) => {
    const {
        name,
        description,
        jobLevel,
        startDate,
        endDate,
        status,
        recurrence,
        points,
        departments,
        answered,
        requested,
        surveyId,
    } = req.body;

    try {
        const newSurvey = new Survey({
            name,
            description,
            jobLevel,
            startDate,
            endDate,
            status,
            recurrence,
            points,
            departments,
            answered,
            requested,
            surveyId,
        });
        await newSurvey.save();
        return res.status(200).send("Survey Saved");
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

const getSurveysByStatus = async (req, res) => {
    const { status } = req.params;
    try {
        const surveys = await Survey.find({ status });
        if (surveys.length === 0) {
            return res
                .status(404)
                .json({ message: `No surveys found with status: ${status}` });
        }
        return res.status(200).json(surveys);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllSurvey,
    getSingleSurvey,
    getSingleSurveyID,
    updateSurvey,
    addSurvey,
    getSurveysByStatus,
};
