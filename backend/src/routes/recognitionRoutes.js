const express = require("express");
const cors = require("cors");

const router = express();
router.use(express.json());
// Use CORS middleware
router.use(cors()); // This will enable CORS for all routes

const {
    addRecognition,
    getRecognition,
    allRecognition,
    updateRecognition,
} = require("../controllers/recognitionController");

router.post("/", addRecognition);

router.get("/", allRecognition);

router.get("/:id", getRecognition);

router.put("/update/:id", updateRecognition);

router.post("/addRecognition", addRecognition);

module.exports = router;
