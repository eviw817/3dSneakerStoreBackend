const Order = require('../../../models/api/v1/Order'); // Import the Order model

// GET /api/v1/orders
const index = async (request, response) => {
    try {
        const orders = await Order.find(); // Get all orders
        response.json(orders); // Send the orders as JSON
    } catch (error) {
        console.log(error);
        response.status(400).json({ message: error.message }); // Send an error if there is one
    }
}

// GET /api/v1/orders/:id
const findOne = async (request, response) => {
    response.json(response.order); // Send the order as JSON
}

// POST /api/v1/orders
const create = async (request, response) => {
    const order = new Order({
        user: request.body.user, 
        title: request.body.title, 
        price: request.body.price, 
        size: request.body.size, 
        color: request.body.color, 
        material: request.body.material, 
        quantity: request.body.quantity
    })
    try {
        const newOrder = await order.save(); // Save the order
        response.status(201).json(newOrder); // Send the order as JSON
    } catch (error) {
        console.log(error);
        response.status(400).json({ message: error.message }); // Send an error if there is one
    }
}

// PUT /api/v1/orders/:id
const updateOne = async (request, response) => {
    const newUser = request.body.user;
    const newTitle = request.body.title;
    const newPrice = request.body.price;
    const newSize = request.body.size;
    const newColor = request.body.color;
    const newMaterial = request.body.material;
    const newQuantity = request.body.quantity
    /**
     * Indien de body volledig leeg is, wordt de PUT niet geaccepteerd.
     */
    if (newUser === undefined && newTitle === undefined && newPrice === undefined && newSize === undefined && newColor === undefined && newMaterial === undefined && newQuantity === undefined) {
        response.status(400).json({
            status: "error",
            message: "PUT message",
            data: {
                message: "No message or user given"
            }
        })
    }
    else {
        // Een leeg update query object wordt aangemaakt
        const updateQuery = {};
        // Afhankelijk van wat er meegegeven is, wordt er in de updateQuery object nieuwe velden aangewezen.
        newUser && (request.body.user = newUser);
        newTitle && (request.body.title = newTitle);
        newPrice && (request.body.price = newPrice);
        newSize && (request.body.size = newSize);
        newColor && (request.body.color = newColor);
        newMaterial && (request.body.material = newMaterial);
        newQuantity && (request.body.quantity = newQuantity)
        /**
         * Het bericht word gevonden gebaseerd op de id en deze wordt dan aangepast.
         */
        Message.findByIdAndUpdate(request.params.id, updateQuery, { new: true })
            .then((message) => {
                if (!message) {
                    response.status(404).json({
                        status: "error",
                        message: "PUT message",
                        data: {
                            message: "Message not found"
                        }
                    })
                } else {
                    response.json({
                        status: "success",
                        message: "Message updated",
                        data: {
                            message: message,
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