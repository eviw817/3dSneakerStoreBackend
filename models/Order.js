const mongoose = require('mongoose');
const Order = mongoose.model("Order", { 
    title: { type: String, required: true },
    price: { type: Number, required: true }, 
    deliveryStatus: { type: String, required: true }, 
    paymentStatus: { type: Boolean, required: true }, 
    timeOfOrder: { type: String, required: true }, 
    parts: {
        outside_1: {
            color: String,
            material: String
        },
        outside_2: {
            color: String,
            material: String
        },
        outside_3: {
            color: String,
            material: String
        },
        sole_bottom: {
            color: String,
            material: String
        },
        sole_top: {
            color: String,
            material: String
        },
        inside: {
            color: String,
            material: String
        },
        laces: {
            color: String,
            material: String
        }
    },
    name: { type: String }, 
    quantity: { type: Number, required: true }, 
    userId: { type: String, required: true } 
});

module.exports = Order;