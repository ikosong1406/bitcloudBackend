const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  picture: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  share: {
    type: String,
    required: true,
  },
  profit: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "completed"],
    default: "active",
  },
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
