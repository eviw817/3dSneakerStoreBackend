const mongoose = require('mongoose');
const Order = mongoose.model("Order", { shoeId: String, name: String, price: Number, deliveryStatus: String, paymentStatus: String, timeOfOrder: String, part: String, material: String, color: String, quantity: Number });

module.exports = Order;