const mongoose = require('mongoose');
const { Schema } = mongoose;


const FeedbackSchema = new Schema({
  user: {
    type: mongoose.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: mongoose.ObjectId,
    ref: 'Product',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  body: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1000,
  },
//   images: [
//     {
//       type: String,
//       required: true,
//     },
//   ],
  is_flagged: {
    type: Boolean,
    default: false,
  },
  flag_reason: {
  type: String,
  enum: ['inappropriate', 'spam', 'offensive', 'product_quality', 'product_availability', 'delivery_time', 'customer_service', 'not_satisfied_product'],
  default: null
}
}, { timestamps: true });

const OrderSchema = new Schema({
  order_id: {
    type: String,
    required: true,
    unique: true
  },
  customer_id: {
    type: mongoose.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product_id: {
      type: mongoose.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    feedback:FeedBackSchema,
    feedback_given:{
        type:Boolean,
        default:false
    }
  }],
  status: {
    type: String,
    enum: ['placed', 'shipped', 'delivered', 'cancelled'],
    default: 'placed'
  },
  shipping_address: {
    type: String,
    required: true
  },
  payment_method: {
    type: String,
    enum: ['cash on delivery', 'credit card', 'debit card', 'net banking'],
    required: true
  },
  payment_status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  },
  total_amount: {
    type: Number,
    required: true
  },
  shipping_charge: {
    type: Number,
    required: true
  },
  order_date: {
    type: Date,
    default: Date.now
  },
  delivery_date: {
    type: Date
  },
  cancellation_date: {
    type: Date
  },
  reason_for_cancellation: {
    type: String
  }
});

module.exports = mongoose.model('Order', OrderSchema);

const Order = require('./models/Order');

Order.findOne({ order_id: 'your_order_id' })
  .populate('items.product_id')
  .exec((err, order) => {
    if (err) {
      console.log('Error occurred while populating products: ', err);
    } else {
      console.log('Order with populated products: ', order);
    }
  });