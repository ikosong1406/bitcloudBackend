const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../Schemas/UsersDetails");

const User = mongoose.model("UserInfo");

router.post("/", async (req, res) => {
  try {
    const { userId, amount, days, rate } = req.body;

    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + days);

    const newStake = {
      amount,
      days,
      rate,
      startDate,
      endDate,
    };

    user.staking.push(newStake);
    await user.save();

    res.json({ msg: "Staking initiated successfully", stake: newStake });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/complete", auth, async (req, res) => {
  try {
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const now = new Date();
    let updated = false;

    user.staking.forEach((stake) => {
      if (stake.status === "active" && now >= new Date(stake.endDate)) {
        const interest = (stake.amount * stake.rate * stake.days) / (100 * 365);
        const totalAmount = stake.amount + interest;
        user.balance += totalAmount;
        stake.status = "completed";
        updated = true;
      }
    });

    if (updated) {
      await user.save();
    }

    res.json({ msg: "Stakes checked and updated", balance: user.balance });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
