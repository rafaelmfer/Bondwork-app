const express = require("express");
const cors = require("cors");
const { authenticateJWT } = require("../controllers/authController");
const {
    getDashboardCharts,
    getRecognitionsCharts,
    getRewardsCharts,
    getSurveysCharts,
    getRecognitionsByStatus,
    getRecognitionByCategory,
    getRewardsManagementByStatus,
    getRewardsRequestByStatus,
    getSurveysManagementByStatus,
    getSatisfactionIndex,
    getAverageScore,
} = require("../controllers/chartsController");

const router = express();

// Use CORS middleware
router.use(cors()); // This will enable CORS for all routes

// Configuring body-parser (integrated in Express)
router.use(express.json()); // To parse JSON
router.use(express.urlencoded({ extended: true })); // To parse form data

// Dashboard Page Charts
// body = { "date": "YYYY-MM-DD"}
router.post("/dashboard", authenticateJWT, getDashboardCharts);

// Recognitions Page Charts
// body = { "date": "YYYY-MM-DD"}
router.post("/recognitions", authenticateJWT, getRecognitionsCharts);

// Rewards Page Charts
// body = { "date": "YYYY-MM-DD"}
router.post("/rewards", authenticateJWT, getRewardsCharts);

// Surveys Page Charts
// body = { "date": "YYYY-MM-DD"}
router.post("/surveys", authenticateJWT, getSurveysCharts);

// Recognition Card by Status route
// body = { "date": "YYYY-MM-DD"}
router.get("/recognitionsStatus", authenticateJWT, getRecognitionsByStatus);

// Recognition Card by Category route
// body = { "date": "YYYY-MM-DD"}
router.get("/recognitionsCategory", authenticateJWT, getRecognitionByCategory);

// Rewards Management Card by Status route
// body = { "date": "YYYY-MM-DD"}
router.get(
    "/rewardsManagementStatus",
    authenticateJWT,
    getRewardsManagementByStatus
);

// Rewards Requests Card by Status route
// body = { "date": "YYYY-MM-DD"}
router.get(
    "/rewardsRequestsStatus",
    authenticateJWT,
    getRewardsRequestByStatus
);

// Surveys Management Card by route
// body = { "date": "YYYY-MM-DD"}
router.get(
    "/surveysManagementStatus",
    authenticateJWT,
    getSurveysManagementByStatus
);

// Employee Satisfaction Index by route
// body = { "date": "YYYY-MM-DD"}
router.get("/satisfactionIndex", authenticateJWT, getSatisfactionIndex);

// Average Score Time by route
// body = { "date": "YYYY-MM-DD"}
router.get("/averageScoreTime", authenticateJWT, getAverageScore);

module.exports = router;
