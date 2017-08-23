const express = require("express");
const mongoose = require("mongoose");
const bluebird = require("bluebird");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Guitar = require("./models/Guitar");

const app = express();
mongoose.Promise = bluebird;

mongoose.connect("mongodb://localhost:27017/collection");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));

app.post("/guitar", (req, res) => {
    console.log(req.body);
    let newGuitar = new Guitar(req.body);
    console.log(newGuitar);
    newGuitar.save()
        .then(function (savedGuitar) {
            res.send(savedGuitar);
        })
        .catch(function (err) {
            res.status(500).send(err);
        })
})

app.get("/guitar", (req, res) => {
    Guitar.find()
        .then(function (foundGuitars) {
            if (!foundGuitars) {
                return res.send({ msg: "No guitars found." });
            }
            return res.send(foundGuitars);
        })
        .catch(function (err) {
            res.status(500).send(err);
        })
});

app.get("/guitar/:id", (req, res) => {
    Guitar.findById(req.params.id)
        .then(function (foundGuitar) {
            if (!foundGuitar) {
                return res.send("No Guitar Found.")
            }
            res.send(foundGuitar);
        })
        .catch(function (err) {
            res.status(500).send(err);
        })
})

app.put("/guitar/:id", (req, res) => {
    Guitar.findByIdAndUpdate(req.params.id, req.body)
        .then(function (updatedGuitar) {
            if (!updatedGuitar) {
                return res.send("No guitar to update.")
            }
            res.send(updatedGuitar);
        })
        .catch(function (err) {
            res.status(500).send(err);
        })
})

app.delete("/guitar/:id", (req, res) => {
    Guitar.findByIdAndRemove(req.params.id)
        .then(function (message) {
            res.send(message)
        })
        .catch(function (err) {
            res.status(500).send(err);
        })
})

app.listen(8080, () => {
    console.log("Server running on port 8080.");
});