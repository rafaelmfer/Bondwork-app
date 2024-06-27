const express = require("express");
const cors = require("cors");
// const router = express.Router();
const router = express();
router.use(express.json());
// Use CORS middleware
router.use(cors()); // This will enable CORS for all routes

const { Questions } = require("../controllers/questionController");

router.get("/", Questions);

module.exports = router;
