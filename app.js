const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const allUsers = require("./Routes/allUsers");
const userdata = require("./Routes/userdata");
const register = require("./Routes/register");
const login = require("./Routes/login");
const verifyEmail = require("./Routes/verifyEmail");
const forgotPassword = require("./Routes/forgotPassword");
const resetPassword = require("./Routes/resetPassword");
const { isResetTokenValid } = require("./utils/user");
const adminLogin = require("./Routes/adminLogin");
const adminRegister = require("./Routes/adminRegister");
const adminDeposit = require("./Routes/adminDeposit");
const adminWithdrawal = require("./Routes/adminWithdrawal");
const buyCoin = require("./Routes/buyCoin");
const sellCoin = require("./Routes/sellCoin");
const transaction = require("./Routes/transaction");
const confirmTransaction = require("./Routes/confirmTransaction");

const PORT = process.env.PORT || 5001;

const mongoUrl =
  "mongodb+srv://Bitvevo:Bitvevo@cluster0.mlwo9kv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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

app.use("/allUsers", allUsers);
app.use("/register", register);
app.use("/login", login);
app.use("/verifyEmail", verifyEmail);
app.use("/forgotPassword", forgotPassword);
app.use("/resetPassword", isResetTokenValid, resetPassword);
app.use("/adminLogin", adminLogin);
app.use("/adminRegister", adminRegister);
app.use("/adminDeposit", adminDeposit);
app.use("/adminWithdrawal", adminWithdrawal);
app.use("/userdata", userdata);
app.use("/buyCoin", buyCoin);
app.use("/sellCoin", sellCoin);
app.use("/transaction", transaction);
app.use("/confirmTransaction", confirmTransaction);

app.listen(PORT, () => {
  console.log("Server Started");
});
