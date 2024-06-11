const express = require("express");
const cors = require("cors");

const {
    insertRewards,
    getAllRewards,
    getSingleReward,
} = require("../controllers/rewardsController");

const router = express();
router.use(express.json());
router.use(cors()); // This will enable CORS for all routes

// http://localhost:5000/api/rewards/insert
// insert note
router.post("/insert", insertRewards);
// {
//     "rewardId": 1,
//     "rewardType": "typeone",
//     "details": "detailsone",
//     "pointsCost": 2,
//     "status": "statusone"
// }

// http://localhost:5000/api/rewards
router.get("/", getAllRewards);

router.get("/:rewardId", getSingleReward);

module.exports = router;
