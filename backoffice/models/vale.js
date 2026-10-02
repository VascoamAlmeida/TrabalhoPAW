const mongoose = require("mongoose");
const valeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
});

module.exports = mongoose.model("Vale", valeSchema);
