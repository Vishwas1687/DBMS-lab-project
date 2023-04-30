// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const OrderSchema = new Schema({
//   order_id: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   customer_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Customer',
//     required: true
//   },
//   items: [{
//     product_id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Product',
//       required: true
//     },
//     quantity: {
//       type: Number,
//       required: true
//     },
//     price: {
//       type: Number,
//       required: true
//     }
//   }],
//   status: {
//     type: String,
//     enum: ['placed', 'shipped', 'delivered', 'cancelled'],
//     default: 'placed'
//   },
//   shipping_address: {
//     type: String,
//     required: true
//   },
//   billing_address: {
//     type: String,
//     required: true
//   },
//   payment_method: {
//     type: String,
//     enum: ['cash on delivery', 'credit card', 'debit card', 'net banking'],
//     required: true
//   },
//   payment_status: {
//     type: String,
//     enum: ['pending', 'completed'],
//     default: 'pending'
//   },
//   total_amount: {
//     type: Number,
//     required: true
//   },
//   shipping_charge: {
//     type: Number,
//     required: true
//   },
//   order_date: {
//     type: Date,
//     default: Date.now
//   },
//   delivery_date: {
//     type: Date
//   },
//   cancellation_date: {
//     type: Date
//   },
//   reason_for_cancellation: {
//     type: String
//   }
// });

// module.exports = mongoose.model('Order', OrderSchema);