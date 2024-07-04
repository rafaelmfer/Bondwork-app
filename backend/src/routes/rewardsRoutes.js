const express = require("express");
const cors = require("cors");

const {
    insertRewards,
    getAllRewards,
    getSingleReward,
    getRewardsManagementByStatus,
    getRewardsRequestByStatus,
} = require("../controllers/rewardsController");

const router = express.Router(); // Use express.Router() to create a router instance
router.use(express.json());
router.use(cors()); // This will enable CORS for all routes

// Insert reward
// http://localhost:5000/api/rewards/insert
router.post("/rewards/insert", insertRewards);
// Example request body:
// {
//     "rewardId": 1,
//     "rewardType": "typeone",
//     "details": "detailsone",
//     "pointsCost": 2,
//     "status": "statusone"
// }

// Get all rewards
// http://localhost:5000/api/rewards
router.get("/", getAllRewards);

// Get a single reward by rewardId
// http://localhost:5000/api/rewards/:rewardId
router.get("/:rewardId", getSingleReward);

// Get rewards by management status: ongoing, upcoming, finished, draft
// http://localhost:5000/api/rewards/managementStatus/:status
router.get("/managementStatus/:status", getRewardsManagementByStatus);

// Get rewards by request status: pending, approved, rejected
// http://localhost:5000/api/rewards/requestStatus/:status
router.get("/requestStatus/:status", getRewardsRequestByStatus);

module.exports = router;
