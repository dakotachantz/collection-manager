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

app.listen(8080, () => {
    console.log("Server running on port 8080.");
});