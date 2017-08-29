const express = require("express");
const mongoose = require("mongoose");
const bluebird = require("bluebird");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Guitar = require("../models/Guitar");
const homeRoutes = express.Router();

mongoose.Promise = bluebird;
mongoose.createConnection("mongodb://localhost:27017/collection");

homeRoutes.get("/", (req, res) => {

    Guitar.find()
        .then(function (foundGuitars) {
            if (!foundGuitars) {
                return res.send({ msg: "No guitars found." });
            }
            res.render("home", { guitar: foundGuitars });
        })
        .catch(function (err) {
            res.status(500).send(err);
        })
});


module.exports = homeRoutes;