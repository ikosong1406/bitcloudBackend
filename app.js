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

const allNews = require("./Routes/allNews");
const allPosition = require("./Routes/allPosition");
const allContact = require("./Routes/allContact");
const allAlumni = require("./Routes/allAlumni");
const allGallery = require("./Routes/allGallery");
const editPosition = require("./Routes/editPosition");
const editContact = require("./Routes/editContact");
const newNews = require("./Routes/newNews");
const addAlumni = require("./Routes/addAlumni");
const addGallery = require("./Routes/addGallery");
const deleteNews = require("./Routes/deleteNews");

const allMethod = require("./Routes/allMethod");
const editMethod = require("./Routes/editMethod");
const allLocation = require("./Routes/allLocation");
const newLocation = require("./Routes/newLocation");

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

// luxeride
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

// nuas
app.use("/allAlumni", allAlumni);
app.use("/allGallery", allGallery);
app.use("/allNews", allNews);
app.use("/allPosition", allPosition);
app.use("/allContact", allContact);
app.use("/editPosition", editPosition);
app.use("/editContact", editContact);
app.use("/newNews", newNews);
app.use("/deleteNews", deleteNews);
app.use("/addAlumni", addAlumni);
app.use("/addGallery", addGallery);

// brainclub
app.use("/allMethod", allMethod);
app.use("/editMethod", editMethod);
app.use("/allLocation", allLocation);
app.use("/newLocation", newLocation);

app.listen(PORT, () => {
  console.log("Server Started");
});
