const mongoose = require("mongoose");

const AlumniSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
});

module.exports = mongoose.model("Alumni", AlumniSchema);
