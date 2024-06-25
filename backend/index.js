const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const fs = require("fs");
const path = require("path");

const mongoose = require("mongoose");

dotenv.config();

// Routes imports
// const noteRoutes = require("./routes/noteRoutes");
const surveyRoutes = require("./src/routes/surveyRoutes");
const userRoutes = require("./src/routes/userRoutes");
const endorsementRoutes = require("./src/routes/endorsementRoutes");
const rewardsRoutes = require("./src/routes/rewardsRoutes");
const departmentsRoutes = require("./src/routes/departmentRoutes");
const companyRoutes = require("./src/routes/companyRoutes");
const questionRoutes = require("./src/routes/questionRoutes");

// Express App
const app = express();

app.use(
    cors({
        origin: "*",
        methods: ["POST", "GET", "PUT"],
        credentials: true,
    })
);
app.use(express.json());

console.log("BACKEND.......");
// Database connection
const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });

// Routes
// Basic route
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/survies", surveyRoutes);
app.use("/api/user", userRoutes);
app.use("/api/endors", endorsementRoutes);
app.use("/api/rewards", rewardsRoutes);
app.use("/api/departments", departmentsRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/company", companyRoutes);

// Delete this endpoint once we create a new one
// Middleware for survies.json
app.use("/api/survies", (req, res) => {
    const filePath = path.join("./survies.json");
    // Read the file survies.json
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error reading the surveys file.");
        }
        return res.status(200).json(data);
    });
});

module.exports = app;
