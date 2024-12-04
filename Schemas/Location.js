const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  city: { type: String, required: true },
  country: { type: String, required: true },
  ip: { type: String, required: true },
  region: { type: String, required: true },
  time: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Location", locationSchema);
