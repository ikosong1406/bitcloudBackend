const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../Schemas/UserDetails");

const User = mongoose.model("UserInfo");

// POST /update-mining-balance
router.post("/", async (req, res) => {
  const { token, balance } = req.body;
  try {
    const user = await User.findOne({ token });
    if (!user) return res.status(404).json({ error: "User not found" });

    user.mining = balance;
    await user.save();

    res.status(200).json({ success: true, message: "Mining balance updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
