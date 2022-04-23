const mongoose = require("mongoose");
// const { required } = require("nodemon/lib/config");
const Schema = mongoose.Schema;
const AddressSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  building: {
    type: String,
  },
  floor: {
    type: String,
  },
  apartment: {
    type: String,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  postalCode: {
    type: Number,
    required: true,
  },
  isPrimary: { type: Boolean },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
const Address = mongoose.model("Address", AddressSchema);
module.exports = Address;
