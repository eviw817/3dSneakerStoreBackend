const Order = require('../models/Order'); // Import the Order model

// GET /api/v1/orders
const index = async (request, response) => {
    try {
        const orders = await Order.find(); // Get all orders
        console.log(orders);
        response.json(orders); // Send the orders as JSON
    } catch (error) {
        response.status(400).json({ message: error.message }); // Send an error if there is one
    }
}

// GET /api/v1/orders/:id
const findOne = async (request, response) => {
    try {
        const order = await Order.findById(request.params.id); // Find the order by id
        if (order === null) {
            return response.status(404).json({ message: 'Order not found' }); // Send a message if the order is not found
        }
        response.json(order); // Send the order as JSON
    }
    catch (error) {
        response.status(500).json({ message: error.message }); // Send an error if there is one
    }
}

// POST /api/v1/orders
const create = async (request, response) => {
    const order = new Order({
        title: request.body.title,
        price: request.body.price, 
        deliveryStatus: request.body.deliveryStatus, 
        paymentStatus: request.body.paymentStatus, 
        timeOfOrder: request.body.timeOfOrder,
        parts: request.body.parts, 
        name: request.body.name,
        size: request.body.size,
        quantity: request.body.quantity,
        userId: request.body.userId
    })
    try {
        const newOrder = await order.save(); // Save the order
        response.status(201).json(newOrder); // Send the order as JSON
    } catch (error) {
        response.status(400).json({ message: error.message }); // Send an error if there is one
    }
}

// PUT /api/v1/orders/:id
const updateOne = async (request, response) => {
    const newTitle = request.body.title;
    const newPrice = request.body.price;
    const newDeliveryStatus = request.body.deliveryStatus;
    const newPaymentStatus = request.body.paymentStatus;
    const newTimeOfOrder = request.body.timeOfOrder;
    const newParts = request.body.parts;
    const newName = request.body.name;
    const newSize = request.body.size;
    const newQuantity = request.body.quantity;
    const newUserId = request.params.userId;
    /**
     * Indien de body volledig leeg is, wordt de PUT niet geaccepteerd.
     */
    if (newTitle === undefined && newPrice === undefined && newDeliveryStatus === undefined && newPaymentStatus === undefined && newTimeOfOrder === undefined && newParts === undefined && newSize === undefined && newQuantity === undefined && newUserId === undefined) {
        response.status(400).json({
            status: "error",
            message: "PUT order",
            data: {
                message: "No order or user given"
            }
        })
    }
    else {
        // Een leeg update query object wordt aangemaakt
        const updateQuery = {};
        console.log(newDeliveryStatus && "Delivery status changed");
        // Afhankelijk van wat er meegegeven is, wordt er in de updateQuery object nieuwe velden aangewezen.
        newTitle && (updateQuery.title = newTitle);
        newPrice && (updateQuery.price = newPrice);
        newDeliveryStatus && (updateQuery.deliveryStatus = newDeliveryStatus);
        newPaymentStatus && (updateQuery.paymentStatus = newPaymentStatus);
        newTimeOfOrder && (request.body.timeOfOrder = newTimeOfOrder);
        newParts && (updateQuery.parts = newParts);
        newName && (request.body.name = newName);
        newSize && (updateQuery.size = newSize);
        newQuantity && (updateQuery.quantity = newQuantity);
        newUserId && (updateQuery.userId = newUserId);
        /**
         * Het bericht word gevonden gebaseerd op de id en deze wordt dan aangepast.
         */
        Order.findByIdAndUpdate(request.params.id, updateQuery, { new: true })
            .then((order) => {
                if (!order) {
                    response.status(404).json({
                        status: "error",
                        message: "PUT order",
                        data: {
                            message: "Order not found"
                        }
                    })
                } else {
                    response.json({
                        status: "success",
                        message: "Order updated",
                        data: {
                            message: order,
                        },
                    });
                }
            })

    }
}

// DELETE /api/v1/orders/:id
const deleteOne = async (request, response) => {
    try {
        const order = await Order.findByIdAndDelete(request.params.id);// Remove the order
        if (order === null) {
            return response.status(404).json({ message: 'Order not found' }); // Send a message if the order is not found
        }
        response.json({ message: 'Order deleted' }); // Send a message if the order
    } catch (error) {
        response.status(500).json({ message: error.message }); // Send an error if there is one
    }
}

module.exports = {
    index,
    findOne,
    create,
    findOne,
    updateOne,
    deleteOne
}