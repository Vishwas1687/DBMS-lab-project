// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const FeedbackSchema = new Schema({
//   user: {
//     type: mongoose.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   product: {
//     type: mongoose.ObjectId,
//     ref: 'Product',
//     required: true,
//   },
//   rating: {
//     type: Number,
//     required: true,
//     min: 1,
//     max: 5,
//   },
//   title: {
//     type: String,
//     required: true,
//     minlength: 10,
//     maxlength: 100,
//   },
//   body: {
//     type: String,
//     required: true,
//     minlength: 50,
//     maxlength: 1000,
//   },
//   helpful_votes: {
//     type: Number,
//     default: 0,
//   },
//   total_votes: {
//     type: Number,
//     default: 0,
//   },
//   verified_purchase: {
//     type: Boolean,
//     default: false,
//   },
//   images: [
//     {
//       type: String,
//       required: true,
//     },
//   ],
//   is_flagged: {
//     type: Boolean,
//     default: false,
//   },
//   flag_reason: {
//     type: String,
//     enum: ['inappropriate', 'spam', 'offensive', 'other'],
//   },
// }, { timestamps: true });

// module.exports = mongoose.model('Feedback', FeedbackSchema);