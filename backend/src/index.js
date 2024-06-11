const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const express = require("express");
const mongoose = require("mongoose");

// Routes imports
// const noteRoutes = require("./routes/noteRoutes");
const surveyRoutes = require("./routes/surveyRoutes");
const userRoutes = require("./routes/userRoutes");
const endorsementRoutes = require("./routes/endorsementRoutes");
const departmentsRoutes = require("./routes/departmentRoutes");

// Express App
const app = express();
app.use(cors());
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

app.use("/api/survey", surveyRoutes);
app.use("/api/user", userRoutes);
app.use("/api/endors", endorsementRoutes);
app.use("/api/departments", departmentsRoutes);

module.exports = app;
