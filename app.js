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
const portfolio = require("./Routes/portfolio");
const adminEdituser = require("./Routes/adminEdituser");
const adminEdittransaction = require("./Routes/adminEdittransaction");
const userTransactions = require("./Routes/userTransaction");

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
app.use("/transaction", transaction);
app.use("/portfolio", portfolio);
app.use("/adminEdituser", adminEdituser);
app.use("/adminEdittransaction", adminEdittransaction);
app.use("/userTransactions", userTransactions);

app.listen(PORT, () => {
  console.log("Server Started");
});
