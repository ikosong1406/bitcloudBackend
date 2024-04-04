const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

require("../Schemas/UserDetails");

const User = mongoose.model("UserInfo");

router.post("/", async (req, res) => {
  const { _id, coinName, coinQuantity, coinPrice } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ _id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Call the buyCoin method to handle the purchase
    await user.buyCoin(coinName, coinQuantity, coinPrice);

    return res.status(200).json({ message: "Coin bought successfully" });
  } catch (err) {
    console.error("Error buying coin:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
