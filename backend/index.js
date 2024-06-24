const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
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

app.use("/api/survey", surveyRoutes);
app.use("/api/user", userRoutes);
app.use("/api/endors", endorsementRoutes);
app.use("/api/rewards", rewardsRoutes);
app.use("/api/departments", departmentsRoutes);
app.use("/api/company", companyRoutes);

module.exports = app;
