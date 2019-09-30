const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders');
const checkAuth = require('../middleware/check-auth');

const Order = require('../models/order');

router.get('/', checkAuth, ordersController.orders_get_all);

router.post("/", checkAuth, ordersController.orders_create_order);

router.get("/:orderId", checkAuth, ordersController.get_order_byId);

router.delete("/:orderId", checkAuth, ordersController.orders_delete_order);

module.exports = router;