const express = require("express");
const cors = require("cors");
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
router.get("/companyName", getCompanyName);

// localhost:5000/api/company/ROI
router.get("/ROI", getROI);

// localhost:5000/api/company/employeesId
router.get("/employeesId", getEmployeesID);

module.exports = router;
