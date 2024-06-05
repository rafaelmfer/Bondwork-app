const dotenv = require("dotenv");

dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes imports
const noteRoutes = require("./routes/noteRoutes");

// Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

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
app.use("/api", noteRoutes);

module.exports = app;
