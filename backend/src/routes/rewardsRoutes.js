const express = require("express");
const cors = require("cors");

const {
    getAllRewards,
    addRewards,
    getSingleReward,
    getRewardRequestDetails,
} = require("../controllers/rewardsController");

const router = express.Router(); // Use express.Router() to create a router instance
router.use(express.json());
router.use(cors()); // This will enable CORS for all routes

router.get("/", getAllRewards);

router.get("/:rewardId", getSingleReward);

router.post("/add", addRewards);
// http://localhost:5001/api/rewards/add
// {
//     "rewardId": 314,
//     "title": "working",
//     "image": "myImage",
//     "category": "Category",
//     "pointsCost": 999,
//     "startDate": 2024,
//     "endDate": 2025,
//     "details": "Details Details Details "
//   }

router.get("/:rewardId/request/:employeeId", getRewardRequestDetails);

module.exports = router;
