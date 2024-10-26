const mongoose = require('mongoose');
const Order = mongoose.model("Order", { user: String, title: String, price: Number, size: Number, color: String, material: String, quantity: Number });

module.exports = Order;