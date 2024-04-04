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

    // Call the sellCoin method to handle the sale
    await user.sellCoin(coinName, coinQuantity, coinPrice);

    return res.status(200).json({ message: "Coin sold successfully", user });
  } catch (err) {
    console.error("Error selling coin:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
