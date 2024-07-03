const express = require("express");
const cors = require("cors");
// const router = express.Router();
const router = express();
router.use(express.json());
// Use CORS middleware
router.use(cors()); // This will enable CORS for all routes

const {
    addUser,
    allUser,
    getOneUser,
    getEmployeeID,
    getDepartment,
    updateUser,
    getHrStaff,
    getEmployeeStaff,
} = require("../controllers/userController");

// localhost:5000/api/user/employeestaff
router.get("/employeestaff", getEmployeeStaff);

// localhost:5000/api/user/hrstaff
router.get("/hrstaff", getHrStaff);

router.get("/", allUser);

router.get("/:id", getOneUser);

router.get("/department/:department", getDepartment);

// localhost:5000/api/user/employee/11
router.get("/employee/:employeeID", getEmployeeID);

router.put("/updateUser/:id", updateUser);

router.post("/addUser", addUser);
// {
//     "email": "cecilia@langara.ca",
//     "password": "cecilialangara",
//     "employeeID": 19,
//     "firstName": "Cecilia",
//     "lastName": "Lopez",
//     "department": "IT",
//     "onBoardingDate": 2022,
//     "jobTitle": "Full Stack Developer",
//     "profilePicture": "picturetwo",
//     "adminRights": false,
//     "surveys": [],
//     "endorsements": [1012, 1013],
//     "points": 210,
//     "lastAccess": 2024,
//     "workSchedule": "survey um"
//   }
module.exports = router;
