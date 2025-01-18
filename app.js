const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

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
  extras: [String],
 })
);

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

mongoose
 .connect(
  'mongodb+srv://fawad7998:fawad7998@cluster0.dnad4.mongodb.net/ContactData?retryWrites=true&w=majority'
 )
 .then(() => console.log('Connected to MongoDB'))
 .catch((err) => console.error('Error connecting to MongoDB:', err));

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

app.post('/submit-order', async (req, res) => {
 try {
  const {coffeeType, quantity, mealType, mealQuantity, size, extras} = req.body;

  if (!coffeeType || !quantity || !size) {
   return res.status(400).send('Coffee type, quantity, and size are required.');
  }

  const newOrder = new Order({
   coffeeType,
   quantity,
   mealType: mealType || null,
   mealQuantity: mealQuantity || null,
   size,
   extras: extras || [],
  });

  await newOrder.save();

  res.send('Your order has been placed successfully!');
 } catch (err) {
  console.error('Error saving order:', err);
  res.status(500).send('An error occurred while placing your order.');
 }
});

app.get('/get-contacts', async (req, res) => {
 try {
  const contacts = await Contact.find();
  res.json(contacts);
 } catch (err) {
  console.error('Error fetching contacts:', err);
  res.status(500).send('An error occurred while fetching contacts.');
 }
});


app.get('/get-orders', async (req, res) => {
 try {
  const orders = await Order.find();
  res.json(orders);
 } catch (err) {
  console.error('Error fetching orders:', err);
  res.status(500).send('An error occurred while fetching orders.');
 }
});

app.delete('/delete-contact/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    res.send('Contact deleted successfully!');
  } catch (err) {
    console.error('Error deleting contact:', err);
    res.status(500).send('An error occurred while deleting the contact.');
  }
});

app.delete('/delete-order/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    res.send('Order deleted successfully!');
  } catch (err) {
    console.error('Error deleting order:', err);
    res.status(500).send('An error occurred while deleting the order.');
  }
});

// Update contact by ID
app.put('/update-contact/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, message } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(id, { name, email, message }, { new: true });

    if (!updatedContact) {
      return res.status(404).send('Contact not found.');
    }

    res.send('Contact updated successfully!');
  } catch (err) {
    console.error('Error updating contact:', err);
    res.status(500).send('An error occurred while updating the contact.');
  }
});

// Update order by ID
app.put('/update-order/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { coffeeType, quantity, size } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(id, { coffeeType, quantity, size }, { new: true });

    if (!updatedOrder) {
      return res.status(404).send('Order not found.');
    }

    res.send('Order updated successfully!');
  } catch (err) {
    console.error('Error updating order:', err);
    res.status(500).send('An error occurred while updating the order.');
  }
});


app.listen(port, () => {
 console.log(`Server is running on http://localhost:${port}`);
});
