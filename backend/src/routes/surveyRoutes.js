const express = require("express");
const cors = require("cors");

const {
    getAllSurvey,
    getSingleSurvey,
    getSingleSurveyID,
    updateSurvey,
    addSurvey,
    getFromBackEnd,
    getSurveysByStatus,
} = require("../controllers/surveyController");

// const {
//     basicAuth
// } = require("../controllers/basicAuthentication")

const router = express();
router.use(express.json());

// Use CORS middleware
router.use(cors()); // This will enable CORS for all routes

// Apply basicAuth middleware to all routes
// router.use(basicAuth);

// localhost:5000/survey
router.get("/", getAllSurvey);

// TODO Delete once we can get them from the database
//
router.get("/survies", getFromBackEnd);

// localhost:5000/surveys/xxxxx-xxxx-xxxxx
router.get("/:id", getSingleSurvey);

// Get single note from user_id
// localhost:5000/surveys/surveyID/33
router.get("/surveyId/:surveyId", getSingleSurveyID);

// localhost:5000/surveys/updateSurvey/66624bf1b42f3fc1effcb5f4
router.put("/updateSurvey/:id", updateSurvey);

// add new Survey
router.post("/addsurvey", addSurvey);
// localhost:5000/surveys/addsurvey
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

// Routes for getting surveys by status
// localhost:5000/survey/status/ongoing
// status could be: ongoing ,upcoming, finished, draft
router.get("/survey/status/:status", getSurveysByStatus);

module.exports = router;
