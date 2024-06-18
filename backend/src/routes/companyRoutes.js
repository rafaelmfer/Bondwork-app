const express = require("express");

const router = express.Router();

const { addCompany } = require("../controllers/companyController");

router.post("/addCompany", addCompany);

module.exports = router;
