const express = require("express");
const cors = require("cors");

const {
    getAllSurvey,
    getSingleSurvey,
    getSingleSurveyID,
    updateSurvey,
    addSurvey,
    getSurveysByStatus,
} = require("../controllers/surveyController");

const router = express();
router.use(express.json());

// Use CORS middleware
// This will enable CORS for all routes
router.use(cors());

router.get("/", getAllSurvey);

router.get("/:id", getSingleSurvey);

router.get("/surveyId/:surveyId", getSingleSurveyID);

router.put("/updateSurvey/:id", updateSurvey);

router.post("/addsurvey", addSurvey);

// Routes for getting surveys by status
// localhost:5000/survey/status/ongoing
// status could be: ongoing ,upcoming, finished, draft
router.get("/survey/status/:status", getSurveysByStatus);

module.exports = router;
