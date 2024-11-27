const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  secretariate: { type: String, required: true },
  motto: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

module.exports = mongoose.model("Contact", ContactSchema);
