const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getAllOrders
} = require('../controllers/orderController');

router.post('/placeorder', placeOrder);
// Route to get all orders (protected route requiring JWT authentication)
router.get('/allorders', getAllOrders);
module.exports = router