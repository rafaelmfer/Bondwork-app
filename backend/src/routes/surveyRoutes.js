const express = require("express");
const cors = require("cors");

const {
    getAllSurvey,
    getSingleSurvey,
    getSingleSurveyID,
    updateSurvey,
    addSurvey,
    getFromBackEnd,
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

// localhost:5000/survey/xxxxx-xxxx-xxxxx
router.get("/:id", getSingleSurvey);

// Get single note from user_id
// localhost:5000/survey/surveyID/33
router.get("/surveyID/:surveyID", getSingleSurveyID);

// localhost:5000/survey/updateSurvey/66624bf1b42f3fc1effcb5f4
router.put("/updateSurvey/:id", updateSurvey);

// add new Survey
router.post("/addSurvey", addSurvey);

module.exports = router;
