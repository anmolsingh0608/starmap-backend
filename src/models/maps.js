const { Schema, model } = require("mongoose");

const Map = new Schema({
  name: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  config: {
    required: true,
    type: Object,
  },
});

module.exports = model("Map", Map);
