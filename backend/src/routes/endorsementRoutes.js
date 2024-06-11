const express = require("express");
const cors = require("cors");

const router = express();
router.use(express.json());
// Use CORS middleware
router.use(cors()); // This will enable CORS for all routes

const {
    addEndorsement,
    getEndorsement,
    allEndorsement,
    updateEndorsement,
    getPublishedEndorsement,
    getNotPublishedEndorsement,
    getStatusEndorsementA,
    getStatusEndorsementP,
    getStatusEndorsementR,
} = require("../controllers/endorsementController");

router.get("/published/", getPublishedEndorsement);

router.get("/notpublished", getNotPublishedEndorsement);

router.get("/statusP", getStatusEndorsementP);

router.get("/statusA", getStatusEndorsementA);

router.get("/statusR", getStatusEndorsementR);

router.get("/", allEndorsement);

router.get("/:id", getEndorsement);

router.put("/update/:id", updateEndorsement);

// add new Endorsement
router.post("/addEndorsement", addEndorsement);
// http://localhost:5000/api/endors/addEndorsement
// {
//     "details": "detailsone",
//     "sender": "senderone",
//     "receiver": "receiverone",
//     "status": "statusone",
//     "category": "categoryone",
//     "date": 2,
//     "points": 11,
//     "published": true,
//   }

module.exports = router;
