const mongoose = require("mongoose");
const Note = require("../models/NoteModel");

// Get all notes
const getNotes = async (req, res) => {
    const { userid } = req.params;

    const notes = await Note.find({ user_id: userid }).sort({ createdAt: -1 });

    res.status(200).json(notes);
};

// Get a single note
const getNote = async (req, res) => {
    const { userid, clientid, id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such note" });
    }

    const note = await Note.findOne({
        user_id: userid,
        client_id: clientid,
        _id: id,
    });

    if (!note) {
        return res.status(404).json({ error: "No such note" });
    }

    return res.status(200).json(note);
};

// const insert note
const insertNote = async (req, res) => {
    try {
        const note = await Note.create(req.body);
        res.status(200).json(note);
    } catch (error) {
        console.log(req.body);
        res.send(req.body);
    }
};

const getAllNote = async (req, res) => {
    try {
        const allNotes = await Note.find({});
        res.status(200).json(allNotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSingleNote = async (req, res) => {
    try {
        const { id } = req.params;
        const singleNote = await Note.findById(id);
        res.status(200).json(singleNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSingleUserID = async (req, res) => {
    try {
        const { userId } = req.params;
        const singleNote = await Note.findOne({ user_id: userId });
        res.status(200).json(singleNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSingleClientID = async (req, res) => {
    try {
        const { userId } = req.params;
        const singleNote = await Note.findOne({ client_id: userId });
        res.status(200).json(singleNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllNote,
    insertNote,
    getSingleNote,
    getSingleUserID,
    getSingleClientID,
};
