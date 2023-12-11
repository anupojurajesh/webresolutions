const mongoose = require('mongoose')

const ordersSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    order_number: {
      type: String,
      required: true,
    },
    order_items: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    payment_mode: {
        type: String,
        required: true,
      },
      order_status: {
        type: String,
        required: true,
      },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Orders', ordersSchema)
