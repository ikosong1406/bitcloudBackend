const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../Schemas/UsersDetails");

const User = mongoose.model("UserInfo");

router.post("/", async (req, res) => {
  try {
    const { userId, pin, securityPhrase } = req.body;

    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Verify the PIN
    if (user.pin !== pin) {
      return res.status(401).json({ msg: "Invalid PIN" });
    }

    user.securityPhrase = securityPhrase;
    await user.save();

    res.json({ msg: "Security phrase saved successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
