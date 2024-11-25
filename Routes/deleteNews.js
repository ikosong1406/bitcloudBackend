const express = require("express");
const router = express.Router();
const News = require("../Schemas/News"); // Assuming Event model is in the 'models' folder

// POST route to create a new event
router.post("/", async (req, res) => {
  const { id } = req.body;

  try {
    const deletedNews = await News.findByIdAndDelete(id);
    if (!deletedNews) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).json({ message: "News deleted successfully" });
  } catch (error) {
    console.error("Error deleting news:", error);
    res.status(500).json({ message: "Failed to delete news" });
  }
});

module.exports = router;
