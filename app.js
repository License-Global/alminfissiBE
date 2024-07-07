var express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var ordersRouter = require("./routes/orders");
var authRouter = require("./routes/auth");
var archiveRouter = require("./routes/archive");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "luna",
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/orders", ordersRouter); // Gestisce tutte le route per /orders
app.use("/auth", authRouter);
app.use("/archive", archiveRouter);

module.exports = app;
