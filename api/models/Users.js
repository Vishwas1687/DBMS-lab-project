const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const uuid = require('uuid')

const AddressSchema = new Schema({
  address_id: {
    type: Number,
    unique: true,
  },
  house_number: {
    type: Number,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  block: {
    type: String,
    required: true,
  },
  locality: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
});


const UserSchema = new Schema({
  user_id:{
    type:String,
    default: () => uuid.v4().replace(/-/g, '').slice(0, 4)
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  addresses: [AddressSchema],
  recommended_products: [{
    product: {
      type: mongoose.ObjectId,
      ref: 'Product',
      required: true,
    },
    no_of_times_visited: {
      type: Number,
      required: true,
    },
    no_times_added_to_cart: {
      type: Number,
      required: true,
    },
    no_of_times_purchased: {
      type: Number,
      required: true,
    },
  }],
  answer:{
    type:String,
    required:true
  },
  phone_number:
  {
    type:String,
    required:true
  },
  role:{
    type:Number,
    default:0
  }
}, { timestamps: true });

UserSchema.path('addresses').required(false);
UserSchema.path('recommended_products').required(false);

module.exports = model('User', UserSchema);