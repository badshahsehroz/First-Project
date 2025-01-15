const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const port = 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

mongoose.connect("mongodb://localhost:27017/coffee_house");
const db = mongoose.connection;
db.once("open", () => {
  console.log("Mongodb connect");
});

app.listen(port, () => {
  console.log("server started");
});
