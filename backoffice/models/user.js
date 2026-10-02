//models\user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  role: {
    type: String,
    enum: ["Admin", "Funcionario", "Doador"],
    default: "Doador",
  },
  password: {
    type: String,
    required: true,
  },
  vales: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vale",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
