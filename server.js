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
const guitarRoutes = require("./routes/guitarRoutes");
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

// ROUTES
app.use("/", homeRoutes);
app.use("/guitar", guitarRoutes);

// LISTEN
app.listen(port, () => {
    console.log("Server running on PORT: ", port);
});