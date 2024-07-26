const express = require("express");
const cors = require("cors");
const { authenticateJWT } = require("../controllers/authController");

const {
    getAllSurvey,
    getSingleSurvey,
    getSingleSurveyID,
    updateSurvey,
    addSurvey,
    createSurvey,
    getSurveysByStatus,
} = require("../controllers/surveyController");

const router = express();
router.use(express.json());

// Use CORS middleware
// This will enable CORS for all routes
router.use(cors());

router.get("/", authenticateJWT, getAllSurvey);

router.get("/:id", authenticateJWT, getSingleSurvey);

router.get("/surveyId/:surveyId", authenticateJWT, getSingleSurveyID);

router.put("/updateSurvey/:id", authenticateJWT, updateSurvey);

router.post("/addsurvey", authenticateJWT, addSurvey);

router.post("/createSurvey", authenticateJWT, createSurvey);

router.get("/survey/status/:status", authenticateJWT, getSurveysByStatus);

module.exports = router;
