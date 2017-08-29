const express = require("express");
const mongoose = require("mongoose");
const bluebird = require("bluebird");
const bodyParser = require("body-parser");
const mustacheExpress = require("mustache-express");
const logger = require("morgan");
const path = require("path");
const port = process.env.PORT || 8080;
const Guitar = require("./models/Guitar");
const homeRoutes = require("./routes/homeRoutes");
const detailRoutes = require("./routes/detailRoutes");

const app = express();
mongoose.Promise = bluebird;

mongoose.connect("mongodb://localhost:27017/collection");

// TEMPLATING ENGINE
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

// MIDDLEWARE
app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));

app.use("/", homeRoutes);
app.use("/guitars", detailRoutes);

app.post("/newguitar", (req, res) => {
    console.log(req.body);
    let newGuitar = new Guitar(req.body);
    console.log(newGuitar);
    newGuitar.save()
        .then(function (savedGuitar) {
            return res.redirect("/");
        })
        .catch(function (err) {
            return res.status(500).send(err);
        })
})

app.get("/guitar/:id", (req, res) => {
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
})

app.post("/updateguitar/:id", (req, res) => {
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
})

app.post("/deleteguitar/:id", (req, res) => {
    Guitar.findByIdAndRemove(req.params.id)
        .then(function (message) {
            return res.redirect("/");
        })
        .catch(function (err) {
            return res.status(500).send(err);
        })
})

app.listen(port, () => {
    console.log("Server running on PORT: ", port);
});