const { Schema, model } = require("mongoose");

const Orders = new Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  address: {
    required: true,
    type: String,
  },
  address2: {
    required: false,
    type: String,
  },
  country: {
    required: true,
    type: String,
  },
  region: {
    required: true,
    type: String,
  },
  zip: {
    required: true,
    type: Number,
  },
  stripe_transaction_id: {
    required: true,
    type: String,
  },
  items: {
    required: true,
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("Orders", Orders);
