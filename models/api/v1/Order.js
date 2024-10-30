const mongoose = require('mongoose');
const Order = mongoose.model("Order", { userId: String, title: String, price: Number, size: String, color: String, material: String, quantity: Number });

module.exports = Order;