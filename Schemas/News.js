const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  cover: { type: String, required: true },
  heading: { type: String, required: true },
  body: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("News", NewsSchema);
