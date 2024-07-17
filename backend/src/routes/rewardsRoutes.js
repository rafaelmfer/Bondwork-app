const express = require("express");
const cors = require("cors");

const {
    getAllRewards,
    addRewards,
    getSingleReward,
    getRewardRequestDetails,
    updateRewardRedeem,
} = require("../controllers/rewardsController");

const router = express.Router(); // Use express.Router() to create a router instance
router.use(express.json());
router.use(cors()); // This will enable CORS for all routes

router.get("/", getAllRewards);

router.get("/:rewardId", getSingleReward);

router.post("/add", addRewards);

router.get("/:rewardId/request/:employeeId", getRewardRequestDetails);

// redeemId
router.put("/update/:id", updateRewardRedeem);

module.exports = router;
