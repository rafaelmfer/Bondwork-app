const Endorsement = require("../models/endorsementModel");

const getResultPublishedEndorsement = async (
    adminRights,
    res,
    notFoundMessage
) => {
    try {
        const showAllEndorsement = await Endorsement.find({
            published: adminRights,
        });

        if (showAllEndorsement.length === 0) {
            return res.status(404).json({ message: notFoundMessage });
        }

        return res.status(200).json(showAllEndorsement);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getPublishedEndorsement = (req, res) =>
    getResultPublishedEndorsement(true, res, "No Endorsement found");

const getNotPublishedEndorsement = (req, res) =>
    getResultPublishedEndorsement(false, res, "No Endorsement found");

const getStatusdEndorsement = async (status, res, notFoundMessage) => {
    try {
        const showAllEndorsement = await Endorsement.find({ status });

        if (showAllEndorsement.length === 0) {
            return res.status(404).json({ message: notFoundMessage });
        }

        return res.status(200).json(showAllEndorsement);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getStatusEndorsementP = (req, res) =>
    getStatusdEndorsement("P", res, "No Endorsement found");

const getStatusEndorsementR = (req, res) =>
    getStatusdEndorsement("R", res, "No Endorsement found");

const getStatusEndorsementA = (req, res) =>
    getStatusdEndorsement("A", res, "No Endorsement found");

const allEndorsement = async (req, res) => {
    try {
        const allEndors = await Endorsement.find({});
        return res.status(200).json(allEndors);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getEndorsement = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const showEndorsement = await Endorsement.findById(id);
        return res.status(200).json(showEndorsement);
    } catch (error) {
        return res.status(500).json({ messsage: error.message });
    }
};

const updateEndorsement = async (req, res) => {
    try {
        const { id } = req.params;
        const EndorsementUpdate = await Endorsement.findByIdAndUpdate(
            id,
            req.body
        );

        if (!EndorsementUpdate) {
            return res
                .status(404)
                .json({ message: `Cannot find any User with id: ${id}` });
        }

        const showUpdate = await Endorsement.findById(id);
        return res.status(200).json(showUpdate);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const addEndorsement = async (req, res) => {
    const {
        details,
        sender,
        receiver,
        status,
        category,
        date,
        points,
        published,
    } = req.body;

    try {
        const newEndorsement = new Endorsement({
            details,
            sender,
            receiver,
            status,
            category,
            date,
            points,
            published,
        });
        await newEndorsement.save();
        return res.status(200).send("Endorsement Saved");
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

module.exports = {
    addEndorsement,
    getEndorsement,
    allEndorsement,
    updateEndorsement,
    getPublishedEndorsement,
    getNotPublishedEndorsement,
    getStatusEndorsementP,
    getStatusEndorsementR,
    getStatusEndorsementA,
};
