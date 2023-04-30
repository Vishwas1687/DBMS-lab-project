// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// // Sub-schema for user addresses
// const AddressSchema = new Schema({
//   street: {
//     type: String,
//     required: true,
//   },
//   city: {
//     type: String,
//     required: true,
//   },
//   state: {
//     type: String,
//     required: true,
//   },
//   country: {
//     type: String,
//     required: true,
//   },
//   zip: {
//     type: String,
//     required: true,
//   },
// });

// // Sub-schema for user browsing history
// const BrowsingHistorySchema = new Schema({
//   product: {
//     type: Schema.Types.ObjectId,
//     ref: 'Product',
//     required: true,
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Main user schema with browsing history and recommended products
// const UserSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     index: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   addresses: [AddressSchema],
//   browsing_history: [BrowsingHistorySchema],
//   recommended_products: [{
//     product: {
//       type: Schema.Types.ObjectId,
//       ref: 'Product',
//       required: true,
//     },
//     score: {
//       type: Number,
//       required: true,
//     },
//   }],
// });

// // Indexes for fast querying of recommended products
// UserSchema.index({'recommended_products.product': 1, 'recommended_products.score': -1});

// const UserModel = mongoose.model('User', UserSchema);

// module.exports = UserModel;

// The BrowsingHistorySchema is a sub-schema that represents the user's browsing history for a specific product. It contains two fields: product, which is a reference to the Product schema and timestamp, which represents the time at which the user viewed the product.

// This sub-schema will work in conjunction with the user schema to store the user's browsing history. Whenever a user views a product, a new instance of the BrowsingHistorySchema is created and added to an array of browsing history objects in the user schema. This allows the system to track which products the user has viewed and when they viewed them.

// To answer your question, it doesn't necessarily mean that the user's focus is only on the product page. The BrowsingHistorySchema just keeps track of the user's interaction with a specific product, whether they viewed it on a separate page or on the product listing page, for example.