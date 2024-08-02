const express = require("express");
const cors = require("cors");
const { authenticateJWT } = require("../controllers/authController");
// const router = express.Router();
const router = express();
router.use(express.json());
// Use CORS middleware
router.use(cors()); // This will enable CORS for all routes

const {
    getCompanyName,
    getROI,
    getEmployeesID,
} = require("../controllers/companyController");

// localhost:5000/api/company/companyName
router.get("/companyName", authenticateJWT, getCompanyName);

// localhost:5000/api/company/ROI
router.get("/ROI", authenticateJWT, getROI);

// localhost:5000/api/company/employeesId
router.get("/employeesId", authenticateJWT, getEmployeesID);

module.exports = router;
