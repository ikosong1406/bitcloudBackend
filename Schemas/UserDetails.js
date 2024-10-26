const mongoose = require("mongoose");
const Transaction = require("./TransactionDetails");
const Portfolio = require("./portfolioSchema");

const UserDetailsSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: { type: String, unique: true },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["verified", "notverified"],
      default: "notverified",
    },
    gender: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    country: {
      type: String,
    },
    tin: {
      type: String,
    },
    totalBalance: {
      type: Number,
      default: 0,
    },
    totalInvestment: {
      type: Number,
      default: 0,
    },
    totalReturn: {
      type: Number,
      default: 0,
    },
    portfolio: [Portfolio.schema],
    transactions: [Transaction.schema],
  },
  {
    collection: "UserInfo",
  }
);

mongoose.model("UserInfo", UserDetailsSchema);
