const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

// Initialize Express app
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set up EJS
app.set("view engine", "ejs");

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/coffeehouse")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

// Import models
const Order = require("./order");
const Contact = require("./contact");

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/ordernow", (req, res) => {
  res.render("ordernow");
});

app.get("/contactus", (req, res) => {
  res.render("contactus");
});

app.post("/submit-order", async (req, res) => {
  const { coffeeType, coffeeQuantity, mealType, mealQuantity, size, extras } =
    req.body;

  const newOrder = new Order({
    coffeeType,
    coffeeQuantity,
    mealType,
    mealQuantity,
    size,
    extras,
  });

  await newOrder.save();
  res.redirect("/");
});

app.post("/submit-contact", async (req, res) => {
  const { name, email, message } = req.body;

  const newContact = new Contact({
    name,
    email,
    message,
  });

  await newContact.save();
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
