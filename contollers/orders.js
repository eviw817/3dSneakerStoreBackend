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
    const newOutside_1 = request.body.outside_1;
    const newOutside_2 = request.body.outside_2;
    const newOutside_3 = request.body.outside_3;
    const newSole_bottom = request.body.sole_bottom;
    const newSole_top = request.body.sole_top;
    const newInside = request.body.inside;
    const newLaces = request.body.laces;
    const newMaterial = request.body.material;
    const newColor = request.body.color;
    const newName = request.body.name;
    const newSize = request.body.size;
    const newQuantity = request.body.quantity;
    const newUserId = request.params.userId;
    /**
     * Indien de body volledig leeg is, wordt de PUT niet geaccepteerd.
     */
    if (newTitle === undefined && newPrice === undefined && newDeliveryStatus === undefined && newPaymentStatus === undefined && newTimeOfOrder === undefined && newOutside_1 === undefined && newOutside_2 === undefined && newOutside_3 === undefined && newSole_bottom === undefined && newSole_top === undefined && newInside === undefined && newLaces === undefined && newSize === undefined && newQuantity === undefined && newUserId === undefined) {
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
        // Afhankelijk van wat er meegegeven is, wordt er in de updateQuery object nieuwe velden aangewezen.
        newTitle && (request.body.title = newTitle);
        newPrice && (request.body.price = newPrice);
        newDeliveryStatus && (request.body.deliveryStatus = newDeliveryStatus);
        newPaymentStatus && (request.body.paymentStatus = newPaymentStatus);
        newTimeOfOrder && (request.body.timeOfOrder = newTimeOfOrder);
        newOutside_1 && (request.body.outside_1 = newOutside_1);
        newOutside_2 && (request.body.outside_2 = newOutside_2);
        newOutside_3 && (request.body.outside_3 = newOutside_3);
        newSole_bottom && (request.body.sole_bottom = newSole_bottom);
        newSole_top && (request.body.sole_top = newSole_top);
        newInside && (request.body.inside = newInside);
        newLaces && (request.body.laces = newLaces);
        newMaterial && (request.body.material = newMaterial);
        newColor && (request.body.color = newColor);
        newName && (request.body.name = newName);
        newSize && (request.body.size = newSize);
        newQuantity && (request.body.quantity = newQuantity);
        newUserId && (request.params.userId = newUserId);
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
        await response.order.remove(); // Remove the order
        response.json({ message: 'Order removed' }); // Send a message
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