const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../Schemas/UserDetails");
const { sendMail } = require("../utils/mail");
const { Portfolio } = require("../Templates/Portfolio");

const User = mongoose.model("UserInfo");

router.post("/", async (req, res) => {
  try {
    const { userId, picture, name, amount, share, profit } = req.body;

    // Convert amount to an integer
    // const stakedAmount = parseInt(amount, 10);

    if (isNaN(amount)) {
      return res.status(400).json({ msg: "Invalid amount provided" });
    }

    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Deduct the staked amount from the user's balance
    user.totalBalance -= amount;

    // Update the staking balance with the staked amount
    user.investmentBalance += amount;

    const startDate = new Date();

    const newPortfolio = {
      picture,
      name,
      amount: amount,
      share,
      profit,
      startDate,
      status: "active",
    };

    user.portfolio.push(newPortfolio);
    await user.save();

    sendMail(
      user.email,
      "Investment Confirmation",
      "",
      Portfolio(
        user.firstname,
        newPortfolio.share,
        newPortfolio.amount,
        newPortfolio.profit,
        newPortfolio.name
      )
    );

    res.json({ msg: "Investment initiated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
