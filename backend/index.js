const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");

dotenv.config();

// Routes imports
const authRoutes = require("./src/routes/authRoutes");
const surveyRoutes = require("./src/routes/surveyRoutes");
const userRoutes = require("./src/routes/userRoutes");
const rewardsRoutes = require("./src/routes/rewardsRoutes");
const departmentsRoutes = require("./src/routes/departmentRoutes");
const companyRoutes = require("./src/routes/companyRoutes");
const chartsRoutes = require("./src/routes/chartsRoutes");
const recognitionRoutes = require("./src/routes/recognitionRoutes");
// Express App
const app = express();

// Configuring CORS to allow all origins
app.use(
    cors({
        origin: "*",
        methods: ["POST", "GET", "PUT"],
        credentials: true,
    })
);

// Configuring body-parser (integrated in Express)
app.use(express.json()); // To parse JSON
app.use(express.urlencoded({ extended: true })); // To parse form data

// Database connection
console.log("BACKEND.......");
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

// JWT setup
app.use((req, res, next) => {
    if (
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split("=")[0] === "JWT"
    ) {
        jsonwebtoken.verify(
            req.headers.authorization.split("=")[1],
            process.env.SECRET_JWT_SIGN,
            (err, decode) => {
                if (err) req.user = undefined;
                req.user = decode;
                next();
            }
        );
    } else {
        req.user = undefined;
        next();
    }
});

// Routes
// Basic route
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/auth", authRoutes);
app.use("/api/surveys", surveyRoutes);
app.use("/api/user", userRoutes);
app.use("/api/rewards", rewardsRoutes);
app.use("/api/departments", departmentsRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/recognition", recognitionRoutes);
app.use("/api/charts", chartsRoutes);

module.exports = app;
