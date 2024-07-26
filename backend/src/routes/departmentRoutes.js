const express = require("express");
const cors = require("cors");
const { authenticateJWT } = require("../controllers/authController");

const router = express();
router.use(express.json());
// Use CORS middleware
router.use(cors()); // This will enable CORS for all routes

const {
    allDepartment,
    getSingleDepartment,
} = require("../controllers/departmentController");

router.get("/", authenticateJWT, allDepartment);

router.post("/:departmentId", authenticateJWT, getSingleDepartment);

module.exports = router;
