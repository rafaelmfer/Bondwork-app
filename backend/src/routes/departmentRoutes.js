const express = require("express");
const cors = require("cors");
// const router = express.Router();
const router = express();
router.use(express.json());
// Use CORS middleware
router.use(cors()); // This will enable CORS for all routes

const {
    allDepartment,
    getSingleDepartment,
} = require("../controllers/departmentController");

router.get("/", allDepartment);

router.post("/:departmentId", getSingleDepartment);

module.exports = router;
