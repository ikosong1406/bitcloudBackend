const mongoose = require("mongoose");

const PositionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  holder: { type: String, required: true },
  image: { type: String, default: "" }, // Optional image for the position
});

module.exports = mongoose.model("Position", PositionSchema);
