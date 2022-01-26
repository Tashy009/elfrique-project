// package imports
require("dotenv").config();
const Sequelize = require("sequelize");
const moment = require("moment");
const path = require("path");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

// local imports
//const Users = require("./models").User
//const parameters = require("./config/params");
//const auth = require("./config/auth");
const db = require("./database/db");

// imports initialization
const Op = Sequelize.Op;

// routes includes
const webRoute = require("./routes/webRoutes");

// imports initalization
const app = express();
const server = http.createServer(app);
let users = [];

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "POST, PUT, GET, PATCH, DELETE, OPTIONS"
  );
  next();
});
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(morgan("dev"));
// set up public folder
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname + "uploads")));
// Static Files
// dashboard
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/images", express.static(__dirname + "public/images"));
app.use("/assests", express.static(__dirname + "public/assests3"));

// routes
app.use("/", webRoute);

/* app.get("/", (req, res, next) => {
  res.render("signup2");
});

app.get("/login", (req, res, next) => {
  res.render("login");
}); */

// 404 not found
app.use(function (req, res) {
  res.status(404).render("base/404");
});

// server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
