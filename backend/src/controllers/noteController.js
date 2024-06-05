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
