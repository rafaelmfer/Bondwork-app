const express = require("express");
const cors = require("cors");
// const router = express.Router();
const router = express();
router.use(express.json());
// Use CORS middleware
router.use(cors()); // This will enable CORS for all routes

const {
    insertDepartment,
    allDepartment,
    getSingleDepartment,
} = require("../controllers/departmentController");

router.post("/new", insertDepartment);
// {
//     "departmentId": 1,
//     "departmentName": "departmentone",
//     "employees": "employeesone",
//     "surveyAssign": ["{Name: nameone, email: emailone@hotmail.com}","{Name: nametwo, email: emailtwo@hotmail.com} "]
// }

router.post("/", allDepartment);

router.post("/:departmentId", getSingleDepartment);

module.exports = router;
