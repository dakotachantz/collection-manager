const express = require("express");
const mongoose = require("mongoose");
const bluebird = require("bluebird");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Guitar = require("../models/Guitar");
const detailRoutes = express.Router();

mongoose.Promise = bluebird;
mongoose.createConnection("mongodb://localhost:27017/collection");




module.exports = detailRoutes;