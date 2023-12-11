const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Orders = require('../models/ordersModel')
const User = require('../models/userModel');

// @desc    Place New Order
// @route   POST /api/order/placeorder
// @access  Public
const placeOrder = asyncHandler(async (req, res) => {
  const { user_id, order_number, order_items, amount , payment_mode, order_status } = req.body

  if (!user_id || !order_number || !order_items || !amount || !payment_mode || !order_status)  {
    res.status(500)
    throw new Error('Please add all fields')
  }

 
  const order = await Orders.create({
    user_id,
    order_number,
    order_items,
    amount,
    payment_mode,
    order_status,
  })

  if (order) {
    res.status(201).json({
      order_number: order.order_number,
      items: order.order_items,
      amount:order.amount,
      payment_mode: order.payment_mode,
      order_status: order.order_status,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Get all orders
// @route   GET /api/order/all
// @access  Private (requires JWT authentication)
const getAllOrders = asyncHandler(async (req, res) => {
  // Check if the user exists in the request (you might need to modify this logic based on how the user data is attached to the request)
  // Assuming user data is attached to the request
  // Fetch orders related to the user ID
  const orders = await Orders.find({});

  if (orders) {
     res.status(200).json({orders}
      //{
    //   _id: orders.id,
    //   user_id: orders.user_id,
    //   order_number:orders.order_number,
    //   order_items:JSON.stringify(orders.order_items),
    //   amount:orders.amount,
    //   payment_mode:orders.payment_mode,
    //   order_status:orders.order_status,
    // }
     );
    
  } else {
    res.status(404);
    throw new Error('Orders not found');
  }
});




module.exports = {
  placeOrder,
  getAllOrders,
};