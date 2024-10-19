const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../Schemas/UserDetails");

const User = mongoose.model("UserInfo");

// POST /update-mining-balance
router.post("/", async (req, res) => {
  const { token, amount } = req.body;
  try {
    const user = await User.findOne({ token });
    if (!user) return res.status(404).json({ error: "User not found" });

    const miningValueInDollars = user.mining * 0.5;

    if (miningValueInDollars >= 1000) {
      user.balance += miningValueInDollars; // Add mining value to user's balance
      user.mining = 0; // Reset mining balance after withdrawal
      await user.save();

      res.status(200).json({ success: true, message: "Balance withdrawn" });
    } else {
      res.status(400).json({ error: "Insufficient balance to withdraw" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
