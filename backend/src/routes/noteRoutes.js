const express = require("express");

const { getNotes, getNote } = require("../controllers/noteController");

const router = express.Router();

// Get all notes
router.get("/:userid", getNotes);

// Get single note
router.get("/:userid/:clientid/:id", getNote);

module.exports = router;
