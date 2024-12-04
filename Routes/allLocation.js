const express = require("express");
const router = express.Router();
const Location = require("../Schemas/Location");

router.get("/", async (req, res) => {
  try {
    const data = await Location.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch methods" });
  }
});

module.exports = router;
