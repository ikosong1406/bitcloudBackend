const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(express.json());
app.use(cors());
const allUsers = require("./Routes/allUsers");
const allTransaction = require("./Routes/allTransaction");
const userdata = require("./Routes/userdata");
const register = require("./Routes/register");
const login = require("./Routes/login");
const transaction = require("./Routes/transaction");
const assetSecurity = require("./Routes/assetSecurity");
const staking = require("./Routes/staking");
const adminEdituser = require("./Routes/adminEdituser");
const adminEdittransaction = require("./Routes/adminEdittransaction");
const userTransactions = require("./Routes/userTransaction");
const editMethod = require("./Routes/editMethod");
const allMethod = require("./Routes/allMethod");
const sendMail = require("./Routes/sendMail");
const updateMining = require("./Routes/updateMining");
const miningWithdrawal = require("./Routes/miningWithdrawal");

const PORT = process.env.PORT || 5001;

const mongoUrl =
  "mongodb+srv://BitCloud:BitCloud@database.snpvz.mongodb.net/?retryWrites=true&w=majority&appName=Database";

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });

require("./Schemas/UserDetails");
const User = mongoose.model("UserInfo");

app.use("/login", login);
app.use("/register", register);
app.use("/userdata", userdata);
app.use("/allUsers", allUsers);
app.use("/allTransaction", allTransaction);
app.use("/assetSecurity", assetSecurity);
app.use("/transaction", transaction);
app.use("/staking", staking);
app.use("/adminEdituser", adminEdituser);
app.use("/adminEdittransaction", adminEdittransaction);
app.use("/userTransactions", userTransactions);
app.use("/editMethod", editMethod);
app.use("/allMethod", allMethod);
app.use("/sendMail", sendMail);
app.use("/updateMining", updateMining);
app.use("/miningWithdrawal", miningWithdrawal);

app.listen(PORT, () => {
  console.log("Server Started");
});
