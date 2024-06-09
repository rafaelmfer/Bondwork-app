const express = require("express");

const {
    getAllNote,
    insertNote,
    getSingleNote,
    getSingleUserID,
    getSingleClientID,
} = require("../controllers/noteController");

const router = express();
router.use(express.json());

// insert note
router.post("/", insertNote);

// Get all notes
// localhost:5000/api/all
router.get("/all", getAllNote);

// Get single note from ID
// localhost:5000/api/xxxxxxx-xxxxx-xxxxx
router.get("/:id", getSingleNote);

// Get single note from user_id
// localhost:5000/api/userid/xxxxxxx-xxxxx-xxxxx
router.get("/userid/:user_id", getSingleUserID);

// Get single note from clientID
// localhost:5000/api/clientid/xxxxxxx-xxxxx-xxxxx
router.get("/clientid/:user_id", getSingleClientID);

module.exports = router;
