const express = require("express");
const cors = require("cors");
const { authenticateJWT } = require("../controllers/authController");

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

router.post("/", authenticateJWT, addRecognition);

router.get("/", authenticateJWT, allRecognition);

router.get("/:id", authenticateJWT, getRecognition);

router.put("/update/:id", authenticateJWT, updateRecognition);

router.post("/addRecognition", authenticateJWT, addRecognition);

module.exports = router;
