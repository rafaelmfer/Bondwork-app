const express = require("express");
const cors = require("cors");
const { authenticateJWT } = require("../controllers/authController");
const {
    getTurnoverRate,
    getSatisfactionDrivers,
    getRecognition,
    getRewardsRequest,
} = require("../controllers/dashboardController");

const router = express.Router(); // Use express.Router() to create a router instance
router.use(express.json());
router.use(cors()); // This will enable CORS for all routes

// ----Turnover Rate----
// localhost:5000/api/dashboard/turnoverRate
router.post("/turnoverRate", authenticateJWT, getTurnoverRate);

// ----Satisfaction Drivers----
// localhost:5000/api/dashboard/satisfactionDrivers
router.get("/satisfactionDrivers", authenticateJWT, getSatisfactionDrivers);

// ----Recognition----
// localhost:5000/api/dashboard/recognition
router.get("/recognition", authenticateJWT, getRecognition);

// ----Rewards Request----
// localhost:5000/api/dashboard/rewardsRequest
router.get("/rewardsRequest", authenticateJWT, getRewardsRequest);

module.exports = router;
