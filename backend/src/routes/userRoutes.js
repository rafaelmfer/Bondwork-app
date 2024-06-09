const express = require("express");
const User = require("../models/UserModel");

// const router = express.Router();
const router = express();
router.use(express.json());

// Create a new user
router.post("v1/user/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).send("User registered");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Get all users
router.get("v1/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get all users
router.get("v1/teste", async (req, res) => {
    res.send("Hello World funcionando");
});

module.exports = router;
