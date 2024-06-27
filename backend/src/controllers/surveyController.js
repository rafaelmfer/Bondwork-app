// TODO Delete it
const fs = require("fs");
const path = require("path");

const Survey = require("../models/SurveyModel");

const getAllSurvey = async (req, res) => {
    try {
        const allSurvey = await Survey.find({});
        return res.status(200).json(allSurvey);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
// TODO Delete it after
const getFromBackEnd = async (req, res) => {
    const filePath = path.join(__dirname, "../..", "survies.json");
    // Read the file survies.json
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error reading the surveys file.");
        }
        const jsonData = JSON.parse(data);
        return res.status(200).json(jsonData);
    });
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
        const { surveyID } = req.params;
        const singleSurvey = await Survey.findOne({ surveyID });
        return res.status(200).json(singleSurvey);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateSurvey = async (req, res) => {
    try {
        const { id } = req.params;
        const surveyUpdate = await Survey.findByIdAndUpdate(id, req.body);

        if (!surveyUpdate) {
            return res
                .status(404)
                .json({ message: `Cannot find any prodcut with id: ${id}` });
        }

        const showUpdate = await Survey.findById(id);
        return res.status(200).json(showUpdate);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// TODO Fix it to save into database
const addSurvey = async (req, res) => {
    const newSurvey = req.body;
    const filePath = path.join("./survies.json");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading the file:", err);
            return res.status(500).send("Error reading the file.");
        }

        let survies = [];
        try {
            survies = JSON.parse(data);
            console.log(survies);
        } catch (error) {
            console.log("problem", error);
        }
        survies.survies.push(newSurvey);
        fs.writeFile(
            "survies.json",
            JSON.stringify(survies, null, 2),
            (error) => {
                if (error) {
                    console.error("Error writing to the file:", error);
                    return res.status(500).send("Error writing to the file.");
                }

                // Returning a response after successfully writing the file
                return res.status(201).send(survies);
            }
        );
        // Returning a response after successfully writing the file
        return res.status(201).send("Reading file successfully");
    });
};

module.exports = {
    getAllSurvey,
    getSingleSurvey,
    getSingleSurveyID,
    updateSurvey,
    addSurvey,
    getFromBackEnd,
};
