const mongoose = require('mongoose');
const Order = mongoose.model("Order", { 
    shoeId: { type: String, required: true }, 
    name: { type: String, required: true }, 
    price: { type: Number, required: true }, 
    deliveryStatus: { type: String, required: true }, 
    paymentStatus: { type: String, required: true }, 
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
    quantity: { type: Number, required: true }, 
    userId: { type: String, required: true } 
});

module.exports = Order;