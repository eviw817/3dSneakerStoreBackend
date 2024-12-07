const express = require('express');
const router = express.Router();
const orderController = require("../contollers/orders");

router.get('/', orderController.index);
router.get('/:id', orderController.findOne);
router.post('/', orderController.create);
router.get('/:id', orderController.findOne);
router.put('/:id', orderController.updateOne);
router.delete('/:id', orderController.deleteOne);

module.exports = router;