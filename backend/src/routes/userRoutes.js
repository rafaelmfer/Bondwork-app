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
//     "email": "usuario1@uol.com.br",
//     "password": "senhaum",
//     "employee_ID": 11,
//     "firstName": "primeiro Nome",
//     "lastName": "primeiro lastName",
//     "department": "department umm",
//     "onBoardingDate": 2024,
//     "jobTitle": "titulo job",
//     "profilePicture": "foto um",
//     "adminRights": true,
//     "surveys": "survey um",
//     "endorsements": "endorsementum",
//     "points": 22,
//     "lastAccess": 2025,
//     "workSchedule": "survey um"
//   }
module.exports = router;
