const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());

const Questions = async (req, res) => {
    fs.readFile("./questions.json", "utf8", (err, data) => {
        if (err) {
            console.error("eror lendo o arquivo");
            return res.status(500).send("erro no arquivo");
        }
        return res.status(200).json(data);
    });
};

module.exports = {
    Questions,
};
