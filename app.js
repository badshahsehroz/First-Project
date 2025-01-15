const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// Define schemas and models
const Contact = mongoose.model(
 'Contact',
 new mongoose.Schema({
  name: String,
  email: String,
  message: String,
 })
);

const Order = mongoose.model(
 'Order',
 new mongoose.Schema({
  coffeeType: String,
  quantity: Number,
  mealType: String,
  mealQuantity: Number,
  size: String,
  extras: [String], // Array to handle multiple extras
 })
);

// Middleware
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Connect to MongoDB
mongoose
 .connect(
  'mongodb+srv://fawad7998:fawad7998@cluster0.dnad4.mongodb.net/ContactData?retryWrites=true&w=majority'
 )
 .then(() => console.log('Connected to MongoDB'))
 .catch((err) => console.error('Error connecting to MongoDB:', err));

// Contact form route
app.post('/submit-contact', async (req, res) => {
 try {
  const {name, email, message} = req.body;

  if (!name || !email || !message) {
   return res.status(400).send('All fields are required.');
  }

  const newContact = new Contact({name, email, message});
  await newContact.save();

  res.send("Thank you for your message! We'll get back to you soon.");
 } catch (err) {
  console.error('Error saving contact:', err);
  res.status(500).send('An error occurred while submitting your message.');
 }
});

// Order form route
app.post('/submit-order', async (req, res) => {
 try {
  const {coffeeType, quantity, mealType, mealQuantity, size, extras} = req.body;

  if (!coffeeType || !quantity || !size) {
   return res.status(400).send('Coffee type, quantity, and size are required.');
  }

  const newOrder = new Order({
   coffeeType,
   quantity,
   mealType: mealType || null, // Optional field
   mealQuantity: mealQuantity || null, // Optional field
   size,
   extras: extras || [], // Default to an empty array if no extras
  });

  await newOrder.save();

  res.send('Your order has been placed successfully!');
 } catch (err) {
  console.error('Error saving order:', err);
  res.status(500).send('An error occurred while placing your order.');
 }
});

// Start the server
app.listen(port, () => {
 console.log(`Server is running on http://localhost:${port}`);
});
