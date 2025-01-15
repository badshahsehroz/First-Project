const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  coffeeType: String,
  coffeeQuantity: Number,
  mealType: String,
  mealQuantity: Number,
  size: String,
  extras: [String]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
