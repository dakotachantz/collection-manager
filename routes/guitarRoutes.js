const express = require("express");
const Guitar = require("../models/Guitar");
const guitarRoutes = express.Router();

guitarRoutes.post("/newguitar", (req, res) => {
    let newGuitar = new Guitar(req.body);
    newGuitar.save()
        .then(function (savedGuitar) {
            return res.redirect("/");
        })
        .catch(function (err) {
            return res.status(500).send(err);
        })
});

guitarRoutes.get("/:id", (req, res) => {
    Guitar.findById(req.params.id)
        .then(function (foundGuitar) {
            if (!foundGuitar) {
                return res.send("No Guitar Found.")
            }
            return res.render("details", { guitar: foundGuitar });
        })
        .catch(function (err) {
            return res.status(500).send(err);
        })
});

guitarRoutes.post("/updateguitar/:id", (req, res) => {
    Guitar.findByIdAndUpdate(req.params.id, req.body)
        .then(function (updatedGuitar) {
            if (!updatedGuitar) {
                return res.send("No guitar to update.")
            }
            return res.redirect("/");
        })
        .catch(function (err) {
            return res.status(500).send(err);
        })
});

guitarRoutes.post("/deleteguitar/:id", (req, res) => {
    Guitar.findByIdAndRemove(req.params.id)
        .then(function (message) {
            return res.redirect("/");
        })
        .catch(function (err) {
            return res.status(500).send(err);
        })
})

module.exports = guitarRoutes;