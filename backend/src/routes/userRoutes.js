const express = require("express");
const cors = require("cors");

const router = express();

// Use CORS middleware
router.use(cors()); // This will enable CORS for all routes

// Configuring body-parser (integrated in Express)
router.use(express.json()); // To parse JSON
router.use(express.urlencoded({ extended: true })); // To parse form data

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

router.get("/", allUser);

router.get("/:id", getOneUser);

router.post("/addUser", addUser);

router.put("/updateUser/:id", updateUser);

// localhost:5000/api/user/employeestaff
router.get("/employeestaff", getEmployeeStaff);

// localhost:5000/api/user/hrstaff
router.get("/hrstaff", getHrStaff);

router.get("/department/:department", getDepartment);

// localhost:5000/api/user/employee/11
router.get("/employee/:employeeID", getEmployeeID);

// {
//   "email": "tsteste4@langara.ca",
//   "password": "teste12345",
//   "employeeID": 3322353,
//   "firstName": "Usuario Tester",
//   "lastName": "Blue",
//   "department": "App",
//   "onBoardingDate": {
//     "$date": "1970-01-01T00:00:02.022Z"
//   },
//   "jobTitle": "QA",
//   "profilePicture": "picture23432",
//   "adminRights": false,
//   "surveys": [],
//   "endorsements": [1050,1051],
//   "points": 2333,
//   "lastAccess": {
//     "$date": "1970-01-01T00:00:02.024Z"
//   },
//   "workSchedule": "morning",
// }

module.exports = router;
