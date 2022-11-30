const { Schema, model } = require("mongoose");

const Style = new Schema({
  style: {
    required: true,
    type: String,
  },
  map: {
    required: true,
    type: String,
  },
  text_color: {
    required: false,
    type: String,
  },
  price: {
    required: false,
    type: Number,
  },
});

module.exports = model("Style", Style);
