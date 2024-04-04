const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

require("../Schemas/UserDetails");

const User = mongoose.model("UserInfo");

router.post("/", async (req, res) => {
  const { userId, amount } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId, totalbalance: { $gte: amount } },
      {
        $inc: { totalbalance: -amount },
        $push: { transactions: { type: "Withdrawal", amount } },
      },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found or insufficient balance" });
    }

    return res.status(200).json({ message: "Withdrawal successful" });
  } catch (err) {
    console.error("Error withdrawing amount:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
