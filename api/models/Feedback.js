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
  images: [
    {
      type: String,
      required: true,
    },
  ],
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

module.exports = mongoose.model('Feedback', FeedbackSchema);