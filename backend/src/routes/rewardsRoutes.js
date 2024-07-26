const express = require("express");
const cors = require("cors");
const { authenticateJWT } = require("../controllers/authController");

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

router.get("/", authenticateJWT, getAllRewards);

router.get("/:rewardId", authenticateJWT, getSingleReward);

router.post("/add", authenticateJWT, addRewards);

router.get(
    "/:rewardId/request/:employeeId",
    authenticateJWT,
    getRewardRequestDetails
);

// redeemId
router.put("/update/:id/:redeem", authenticateJWT, updateRewardRedeem);

module.exports = router;
