const express = require("express");
const Guitar = require("../models/Guitar");
const homeRoutes = express.Router();

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