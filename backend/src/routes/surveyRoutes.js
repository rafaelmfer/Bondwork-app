const express = require("express");

const {
    getAllSurvey,
    getSingleSurvey,
    getSingleSurveyID,
    updateSurvey,
    addSurvey,
} = require("../controllers/surveyController");

const router = express();
router.use(express.json());

// localhost:5000/survey
router.get("/", getAllSurvey);

// localhost:5000/survey/xxxxx-xxxx-xxxxx
router.get("/:id", getSingleSurvey);

// Get single note from user_id
// localhost:5000/survey/surveyID/33
router.get("/surveyID/:surveyID", getSingleSurveyID);

// localhost:5000/survey/updateSurvey/66624bf1b42f3fc1effcb5f4
router.put("/updateSurvey/:id", updateSurvey);

// add new Survey
router.post("/addsurvey", addSurvey);
// localhost:5000/survey/addsurvey
// {
//     "surveyID": 33,
//     "status": "surveyStatus",
//     "question1": "question one",
//     "question1Answer": 1,
//     "question2": "question two",
//     "question2Answer": 2,
//     "question3": "question three",
//     "question3Answer": 3,
//     "alreadyAnswered": 9,
//     "totalOfEmployees": 8,
//     "points": 7
//   }

module.exports = router;
