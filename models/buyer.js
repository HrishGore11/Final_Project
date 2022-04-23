const mongoose = require("mongoose");
const BuyerSchema = new mongoose.Schema({
  buyer_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  add_address: {
    type: Array,
    required: true,
    unique: true,
  },

  phone: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
const Customer = mongoose.model("customer", BuyerSchema);
module.exports = Customer;
