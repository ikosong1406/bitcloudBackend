const express = require("express");
const router = express.Router();
const News = require("../Schemas/News");

router.get("/", async (req, res) => {
  try {
    const list = await News.find(); // Fetch all users from the database
    res.json(list); // Send the users as JSON response
  } catch (error) {
    console.error("Error fetching position:", error);
    res.status(500).json({ message: "Error fetching postion" });
  }
});

module.exports = router;
