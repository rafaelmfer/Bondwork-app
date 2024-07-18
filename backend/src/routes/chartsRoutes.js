const express = require("express");
const cors = require("cors");
const {
    getDashboardCharts,
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
router.post("/dashboard", getDashboardCharts);

// Recognition Card by Status route
// body = { "date": "YYYY-MM-DD"}
router.get("/recognitionsStatus", getRecognitionsByStatus);

// Recognition Card by Category route
// body = { "date": "YYYY-MM-DD"}
router.get("/recognitionsCategory", getRecognitionByCategory);

// Rewards Management Card by Status route
// body = { "date": "YYYY-MM-DD"}
router.get("/rewardsManagementStatus", getRewardsManagementByStatus);

// Rewards Requests Card by Status route
// body = { "date": "YYYY-MM-DD"}
router.get("/rewardsRequestsStatus", getRewardsRequestByStatus);

// Surveys Management Card by route
// body = { "date": "YYYY-MM-DD"}
router.get("/surveysManagementStatus", getSurveysManagementByStatus);

// Employee Satisfaction Index by route
// body = { "date": "YYYY-MM-DD"}
router.get("/satisfactionIndex", getSatisfactionIndex);

// Average Score Time by route
// body = { "date": "YYYY-MM-DD"}
router.get("/averageScoreTime", getAverageScore);

module.exports = router;
