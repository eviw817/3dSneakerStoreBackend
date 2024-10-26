const Order = require('../../../models/api/v1/Order'); // Import the Order model

// GET /api/v1/orders
const index = async (req, res) => {
    router.get('/', async (request, response) => {
        try {
            const orders = await Order.find(); // Get all orders
            response.json(orders); // Send the orders as JSON
        } catch (error) {
            response.status(400).json({ message: error.message }); // Send an error if there is one
        }
})
}

// GET /api/v1/orders/:id
const findOne = async (req, res) => {
    router.get('/:id', getOrder, (request, response) => {
    response.json(response.order); // Send the order as JSON
    })
}

// POST /api/v1/orders
const create = async (req, res) => {
    router.post('/', async (request, response) => {
        const order = new Order({
            name: request.body.name,
            quantity: request.body.quantity
        });
    
        try {
            const newOrder = await order.save(); // Save the order
            response.status(201).json(newOrder); // Send the order as JSON
        } catch (error) {
            response.status(400).json({ message: error.message }); // Send an error if there is one
        }
    })
}


// PATCH /api/v1/orders/:id
const updateOne = async (req, res) => {
    router.patch('/:id', getOrder, async (request, response) => {
        if (request.body.name != null) {
            response.order.name = request.body.name;
        }
    
        if (request.body.quantity != null) {
            response.order.quantity = request.body.quantity;
        }
    
        try {
            const updatedOrder = await response.order.save(); // Save the updated order
            response.json(updatedOrder); // Send the updated order as JSON
        } catch (error) {
            response.status(400).json({ message: error.message }); // Send an error if there is one
        }
    })
}

// DELETE /api/v1/orders/:id
const deleteOne = async (req, res) => {
    router.delete('/:id', getOrder, async (request, response) => {
        try {
            await response.order.remove(); // Remove the order
            response.json({ message: 'Order removed' }); // Send a message
        } catch (error) {
            response.status(500).json({ message: error.message }); // Send an error if there is one
        }
    })
}


module.exports = {
    index,
    findOne,
    create,
    findOne,
    updateOne,
    deleteOne
}