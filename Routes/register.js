const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { generateOTP, mailTransport } = require("../utils/mail");
const VerificationToken = require("../Schemas/VerificationToken");
const { verifyCode } = require("../Templates/verifyCode");
require("../Schemas/UserDetails");

const User = mongoose.model("UserInfo");

router.post("/", async (req, res) => {
  const { name, email, password, role } = req.body;
  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    return res.send({ data: "User already exists!!" });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({
      name: name,
      email: email,
      password: encryptedPassword,
      role: role,
    });

    const OTP = generateOTP();
    const verificationToken = new VerificationToken({
      owner: newUser._id,
      token: OTP,
    });

    await verificationToken.save();

    mailTransport().sendMail({
      from: "Bitnexemailverification@gmail.com",
      to: newUser.email,
      subject: "verify your email account",
      html: verifyCode(OTP),
    });

    res.send({ status: "ok", data: "User Created" });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
});

module.exports = router;
